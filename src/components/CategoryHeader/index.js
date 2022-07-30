import classNames from 'classnames/bind'
import style from './CateloryHeader.module.scss'

import astra from '../../assets/images/astra.png'
import handle from '../../assets/svg/arrows-up-down-left-right-solid.svg'

import TickerItem from './TickerItem'

import { useEffect , useRef, useState} from 'react'





const cx = classNames.bind(style)

//let data = [150, -0.1, 200, 100, '1.000.000']

function CateloryHeader() {

    const webSocket = useRef(null);
    const [dataPrice,setDataPrice]=useState('')

    useEffect(() => {
        console.log('Opening WebSocket');
        webSocket.current = new WebSocket('wss://exchange-stream.tiki.vn/?stream=global.tickers');
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
    },[]);

    useEffect(()=>{
        webSocket.current.onmessage=(event)=>{
            let data =JSON.parse(event.data)['global.tickers'].asaxu
            setDataPrice(data)
           // console.log(lastPrice,highPrice,lowPrice,changePercent,volume)
        }
    },[dataPrice])

    console.log('re-render')

    return (
        <>
            <span className='drag-handle'>
                <img src={handle} alt='handle'></img>
            </span>
            <div className={cx('wrapper')}>
                <div className={cx('token')}>
                    <div className={cx('token-logo')}>
                        <img src={astra} alt={'logo token'}></img>
                    </div>
                    <div className={cx('labal')}>Astra</div>
                </div>
                <div className={cx('divider')}></div>

                <div className={cx('ticker-list')}>
                    <TickerItem title={'Giá Gần Nhất'}>{dataPrice.last} Xu</TickerItem>
                    <TickerItem title={'Thay Đổi 24h'} color={'red'}>{dataPrice.price_change_percent}</TickerItem>
                    <TickerItem title={'24h Cao'}>{dataPrice.high} Xu</TickerItem>
                    <TickerItem title={'24h Thấp'}>{dataPrice.low} Xu</TickerItem>
                    <TickerItem title={'KL giao dịch trong 24h'}>{dataPrice.volume} Astra</TickerItem>
                </div>
            </div>
        </>
    );
}

export default CateloryHeader;