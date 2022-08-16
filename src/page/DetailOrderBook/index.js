import classNames from "classnames/bind";
import styles from "./DetailOrderBook.module.scss"

import { useRef, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import OrderItem from './OrderItem';

const cx = classNames.bind(styles)

let asks = []
let bids = []

function DetailOrderBook() {

    const webSocket = useRef(null);
    
    const maxBids = useRef(0)
    const maxAsks = useRef(0)
    const [bidsRender, setBidsRender] = useState([])
    const [asksRender, setAsksRender] = useState([])

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
    const setMax = (bids, asks) => {
        for (let i = 0; i < bids.length; i++) {
            if (parseInt(bids[i][1]) > maxBids.current) maxBids.current = parseInt(bids[i][1])
        }
        for (let i = 0; i < asks.length; i++) {
            if (parseInt(asks[i][1]) > maxAsks.current) maxAsks.current = parseInt(asks[i][1])
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
        if (bids[0]) setMax(bids, asks)
        setBidsRender(bids)
        setAsksRender(asks)
        webSocket.current.onmessage = (event) => {
            let data = JSON.parse(event.data)['asaxu.ob-snap']
            if (data) {
                asks = data.asks
                bids = data.bids
                setBidsRender(bids)
                setAsksRender(asks)
            }
            else {
                data = JSON.parse(event.data)['asaxu.ob-inc']
                if (data) {
                    updateData(data)
                    setMax(bids, asks)
                    if (data.bids) setBidsRender(bids)
                    else setAsksRender(asks)

                }
            }
        }
    }, [])

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div><Link to="/">Exchange</Link></div>
                <div>{'>'}</div>
                <div>OrderBook</div>
            </div>
            <div className={cx('body')}>
                <div className={cx('header-order')}>
                    Order Book 
                </div>
                <div className={cx('order-table')}>
                    <div className={cx('table')}>
                        <div className={cx('title')}>Buy Order</div>
                        <div className={cx('columns')}>
                            <div className={cx('left')}>Side</div>
                            <div>Giá</div>
                            <div>Khối lượng</div>
                            <div className={cx('right')}>Tổng</div>
                        </div>
                        <div className={cx('item')} >
                            {bidsRender.map((item, index) =>
                                <OrderItem side={index} price={item[0]} volume={item[1]} percent={`${parseInt(item[1]) * 100 / maxBids.current}%`} up key={index} />
                            )}
                        </div>
                    </div>
                    <div className={cx('table')}>
                        <div className={cx('title')}>Sell Order</div>
                        <div className={cx('columns')}>
                            <div className={cx('left')}>Side</div>
                            <div>Giá</div>
                            <div>Khối lượng</div>
                            <div className={cx('right')}>Tổng</div>
                        </div>
                        <div className={cx('item')} >
                            {asksRender.map((item, index) =>
                                <OrderItem side={index} price={item[0]} volume={item[1]} percent={`${parseInt(item[1]) * 100 / maxAsks.current}%`} down key={index} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default DetailOrderBook;