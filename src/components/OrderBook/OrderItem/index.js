import classNames from "classnames/bind";
import style from './OrderItem.module.scss'

import {useRef,useEffect} from 'react'

const cx= classNames.bind(style)

function OrderItem({price,volume,percent,up,down}) {

    const okla =useRef()

    
    useEffect(()=>{
        okla.current.style.width=percent
    })


    return ( 
        <div className={cx('order-item')}>
            <div className={cx({'price-up':up},{'price-down':down})}>{Intl.NumberFormat('de-DE').format(price)}</div>
            <div className={cx('volume')}>{Intl.NumberFormat('de-DE').format(volume)}</div>
            <div className={cx('total')}>{Intl.NumberFormat('de-DE').format(price*volume)}</div>
            <div className={cx('volume-bar',{'up':up},{'down':down})} ref={okla}></div>
        </div>
     );
}

export default OrderItem;