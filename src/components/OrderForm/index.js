import classNames from 'classnames/bind'
import style from './OrderForm.module.scss'

import astra from '../../assets/images/astra.png'
import tikixu from '../../assets/svg/tikixu.svg'

import handle from '../../assets/svg/arrows-up-down-left-right-solid.svg'

const cx = classNames.bind(style)


function OrderForm() {
    return (
        <>
            <span className='drag-handle'>
                <img src={handle} alt='handle'></img>
            </span>
            <div className={cx('wrapper')}>
                <div className={cx('tab-nav')}>
                    <div className={cx('tab-nav-list')}>
                        <div className={cx('market-order')}>Lệnh nhanh</div>
                        <div className={cx('limit-order')}>Lệnh chờ</div>
                        <div className={cx('tab-bar-animate', 'limit')}></div>
                    </div>
                </div>
                <div className={cx('order-form')}>
                    <div className={cx('buy-form')}>
                        <div className={cx('price-buy')}>
                            <div className={cx('label')}>Giá</div>
                            <input type='text' ></input>
                            <div className={cx('logo-token')}>
                                <img src={tikixu} alt='logo'></img>
                            </div>
                        </div>
                        <div className={cx('price-buy')}>
                            <div className={cx('label')}>KL</div>
                            <input type='text' ></input>
                            <div className={cx('logo-token')}>
                                <img src={astra} alt='logo'></img>
                            </div>
                        </div>
                        <div className={cx('volume-slider-buy')}></div>
                        <div className={cx('previewAmount')}>
                            <div>Số lượng Xu cần thiết :</div>
                            <div>1000</div>
                            <div className={cx('logo-token')}>
                                <img src={tikixu} alt='logo astra'></img>
                            </div>
                        </div>
                        
                        <button className={cx('buy-button-buy')}>Mua</button>
                        
                    </div>
                    <div className={cx('buy-form')}>
                    <div className={cx('price-buy')}>
                            <div className={cx('label')}>Giá</div>
                            <input type='text' ></input>
                            <div className={cx('logo-token')}>
                                <img src={tikixu} alt='logo'></img>
                            </div>
                        </div>
                        <div className={cx('price-buy')}>
                            <div className={cx('label')}>KL</div>
                            <input type='text' ></input>
                            <div className={cx('logo-token')}>
                                <img src={astra} alt='logo'></img>
                            </div>
                        </div>
                        <div className={cx('volume-slider-buy')}></div>
                        <div className={cx('previewAmount')}>
                            <div>Số lượng Xu ước tính nhận được:</div>
                            <div>1000</div>
                            <div className={cx('logo-token')}>
                                <img src={tikixu} alt='logo astra'></img>
                            </div>
                        </div>
                        
                        <button className={cx('buy-button-sell')}>Bán</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderForm;