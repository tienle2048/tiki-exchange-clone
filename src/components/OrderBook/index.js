import classNames from 'classnames/bind'
import styles from './OrderBook.module.scss'

import defaul from '../../assets/svg/defaul.svg'
import buy from '../../assets/svg/buy.svg'
import sell from '../../assets/svg/sell.svg'
import handle from '../../assets/svg/arrows-up-down-left-right-solid.svg'

import OrderItem from './OrderItem';

import { useRef, useEffect, useState } from 'react'




const cx = classNames.bind(styles)

let asks = []
let bids = []

function OrderBook() {
    const orderList = useRef()
    const webSocket = useRef(null);
    const [bidsRender, setBidsRender] = useState([])
    const [asksRender, setAsksRender] = useState([])
    const [buyValue, setBuyValue] = useState(15)
    const [sellValue, setSellValue] = useState(15)

    const updateData = (newdata) => {
        if (newdata.bids) {
            for (let i = 0; i < bids.length; i++) {
                //console.log(parseInt(newdata.bids[0]), parseInt(bids[i][0]))
                if (parseInt(newdata.bids[0]) === parseInt(bids[i][0])) {
                    if (newdata.bids[1] === '') {
                        let x = bids.splice(0, i + 1)
                        x.pop()
                        bids = x.concat(bids)
                    }
                    else {
                        bids[i][1] = newdata.bids[1]
                    }
                    break
                }
                if (parseInt(newdata.bids[0]) > parseInt(bids[i][0])) {
                    let x = bids.splice(0, i)
                    x.push(newdata.bids)
                    bids = x.concat(bids)
                    break
                }
            }
        }
        else {
            for (let i = 0; i < asks.length; i++) {
                //console.log(parseInt(newdata.bids[0]), parseInt(bids[i][0]))
                if (parseInt(newdata.asks[0]) === parseInt(asks[i][0])) {
                    if (newdata.asks[1] === "") {
                        let x = asks.splice(0, i + 1)
                        x.pop()
                        asks = x.concat(asks)
                    }
                    else {
                        asks[i][1] = newdata.asks[1]
                    }
                    break
                }
                if (parseInt(newdata.asks[0]) < parseInt(asks[i][0])) {
                    let x = asks.splice(0, i)
                    x.push(newdata.asks)
                    asks = x.concat(asks)
                    break
                }
            }
        }
    }

    useEffect(() => {
        console.log('Opening WebSocket');
        webSocket.current = new WebSocket('wss://exchange-stream.tiki.vn/?stream=asaxu.ob-inc');
        const openWebSocket = () => {
            webSocket.current.onopen = (event) => {
                console.log('Open:', event);
            }
        }
        openWebSocket();
        return () => {
            console.log('Closing WebSocket');
            webSocket.current.close();
        }
    }, []);

    useEffect(() => {
        setBidsRender(bids.slice(0, buyValue))
        setAsksRender(asks.slice(0, sellValue))
        webSocket.current.onmessage = (event) => {
            let data
            data = JSON.parse(event.data)['asaxu.ob-snap']
            if (data) {
                asks = data.asks
                bids = data.bids
                setBidsRender(bids.slice(0, buyValue))
                setAsksRender(asks.slice(0, sellValue))
            }
            else {
                data = JSON.parse(event.data)['asaxu.ob-inc']
                if (data) {
                    console.log(buyValue, sellValue)
                    updateData(data)
                    if (data.bids) setBidsRender(bids.slice(0, buyValue))
                    else setAsksRender(asks.slice(0, sellValue))
                    
                }
            }
            //console.log(data)
        }
    }, [buyValue, sellValue])


    useEffect(()=>{
        setInterval(() => {
            webSocket.current.send('ping')
        }, 30000);
        
    },[])

    const handleAll = () => {
        setSellValue(15)
        setBuyValue(15)
        console.log(buyValue, sellValue)
    }

    const handleBuy = () => {
        setBuyValue(30)
        setSellValue(0)
        console.log(buyValue, sellValue)
    }
    const handleSell = () => {
        setSellValue(30)
        setBuyValue(0)
        console.log(buyValue, sellValue)
    }

    console.log('re-render')


    return (
        <>
            <span className='drag-handle'>
                <img src={handle} alt='handle'></img>
            </span>
            <div className={cx('wrapper')}>
                <div className={cx('orderbook-header')}>
                    <div>Sổ lệnh</div>
                    <div className={cx('actions')}>
                        <div className={cx('action')} onClick={handleAll}><img src={defaul} alt='default'></img></div>
                        <div className={cx('action')} onClick={handleBuy}><img src={buy} alt='default'></img></div>
                        <div className={cx('action')} onClick={handleSell}><img src={sell} alt='default'></img></div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('label')}>
                        <div>Giá</div>
                        <div>Khối lượng</div>
                        <div>Tổng</div>
                    </div>
                    <div className={cx('orderlist')} ref={orderList}>
                        <div className={cx('item')} >
                            {bidsRender.map((item, index) =>
                                <OrderItem price={item[0]} volume={item[1]} percent={`${parseInt(item[1]) / 2000}%`} up key={index} />
                            )}
                        </div>

                        <div className={cx('item')} >
                            {asksRender.map((item, index) =>
                                <OrderItem price={item[0]} volume={item[1]} percent={`${parseInt(item[1]) / 2000}%`} down key={index} />
                            )}
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}

export default OrderBook;