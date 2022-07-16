import classNames from 'classnames/bind'
import styles from './OrderBook.module.scss'

import defaul from '../../assets/svg/defaul.svg'
import buy from '../../assets/svg/buy.svg'
import sell from '../../assets/svg/sell.svg'
import handle from '../../assets/svg/arrows-up-down-left-right-solid.svg'

import OrderItem from './OrderItem';



const cx = classNames.bind(styles)

const asks = [
    ['721', '10000'],
    ['720', '15000'],
    ['719', '13000'],
    ['718', '10200'],
    ['717', '400'],
    ['716', '1000'],
    ['715', '5000'],
    ['714', '1000'],
    ['713', '10000'],
    ['716', '1000'],
    ['715', '5000'],
    ['714', '1000'],
    ['713', '10000']
]
const bids = [
    ['721', '10000'],
    ['720', '15000'],
    ['719', '13000'],
    ['718', '10200'],
    ['717', '400'],
    ['716', '1000'],
    ['715', '5000'],
    ['714', '1000'],
    ['713', '10000'],
    ['716', '1000'],
    ['715', '5000'],
    ['714', '1000'],
    ['713', '10000']
]


function OrderBook() {


    return (
        <>
        <span className='drag-handle'>
            <img src={handle} alt='handle'></img>
        </span>
        <div className={cx('wrapper')}>
            <div className={cx('orderbook-header')}>
                <div>Sổ lệnh</div>
                <div className={cx('actions')}>
                    <div className={cx('action')}><img src={defaul} alt='default'></img></div>
                    <div className={cx('action')}><img src={buy} alt='default'></img></div>
                    <div className={cx('action')}><img src={sell} alt='default'></img></div>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('label')}>
                    <div>Giá</div>
                    <div>Khối lượng</div>
                    <div>Tổng</div>
                </div>
                <div className={cx('orderlist')}>
                    <div>
                        {asks.map((item, index) =>
                            <OrderItem price={item[0]} volume={item[1]} percent={'10%'} up key={index} />
                        )}
                    </div>

                    <div>
                        {bids.map((item, index) =>
                            <OrderItem price={item[0]} volume={item[1]} percent={'10%'} down key={index} />
                        )}
                    </div>
                </div>



            </div>


        </div>
        </>
    );
}

export default OrderBook;