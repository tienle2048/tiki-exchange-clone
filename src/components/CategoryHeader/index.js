import classNames from 'classnames/bind'
import style from './CateloryHeader.module.scss'

import astra from '../../assets/images/astra.png'

import TickerItem from './TickerItem'

const cx = classNames.bind(style)

let data=[150,-0.1,200,100,1000000]

function CateloryHeader() {
    return ( 
        <div className={cx('wrapper')}> 
            <div className={cx('token')}>
                <div className={cx('token-logo')}>
                    <img src={astra} alt={'logo token'}></img>
                </div>
                <div className={cx('labal')}>Astra</div>
            </div>
            <div className={cx('divider')}></div>

            <div className={cx('ticker-list')}>
                <TickerItem title={'Giá Gần Nhất'}>{data[0]} Xu</TickerItem>
                <TickerItem title={'Thay Đổi 24h'} color={'red'}>{data[1]} %</TickerItem>
                <TickerItem title={'24h Cao'}>{data[2]} Xu</TickerItem>
                <TickerItem title={'24h Thấp'}>{data[3]} Xu</TickerItem>
                <TickerItem title={'KL giao dịch trong 24h'}>{data[4]} Astra</TickerItem>
            </div>
        </div>
     );
}

export default CateloryHeader;