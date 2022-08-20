import classNames from 'classnames/bind'
import style from './Limit.module.scss'

import astra from '../../../assets/images/astra.png'
import tikixu from '../../../assets/svg/tikixu.svg'
import { Orders } from '../../../services'


import {  useSelector } from 'react-redux'
import { useState } from 'react'
import { Slider } from 'antd'
import { toast } from 'react-toastify';


const cx = classNames.bind(style)

function Limit() {
    const access_token = useSelector(state => state.authen).user.access_token
    const data = useSelector(state => state.info)
    let property = data.property
    const maxAstra = property.balances ? property.balances[0].balance : '0'
    const maxTikixu = property.balances ? property.balances[1].balance : '0'

    const [volumeBuy, setVolumeBuy] = useState('')
    const [volumeSell, setVolumeSell] = useState('')
    const [PriceBuy, setPriceBuy] = useState('')
    const [PriceSell, setPriceSell] = useState('')
    const [percentBuy, setPercentBuy] = useState('')

    const changePriceBuy = (newValue) => {
        if (newValue === "") setPriceBuy(newValue)
        else {
            newValue = Number(newValue)
            if (!isNaN(newValue)) {
                setPriceBuy(newValue)
                setVolumeBuy(Math.floor(percentBuy * maxTikixu / newValue / 100))
            }
        }
    }
    const changePriceSell = (newValue) => {
        if (newValue === "") setPriceSell(newValue)
        else {
            newValue = Number(newValue)
            if (!isNaN(newValue)) setPriceSell(newValue)
        }
    }
    const changeVolumeBuy = (newValue) => {
        if (newValue === "") setVolumeBuy(newValue)
        else {
            newValue = Number(newValue)
            if (!isNaN(newValue)) {
                if (newValue > maxTikixu / PriceBuy) newValue = Math.floor(maxTikixu / PriceBuy)
                setVolumeBuy(newValue)
                setPercentBuy(Math.floor(newValue * PriceBuy / maxTikixu * 100))
            }
        }
    }
    const changeVolumeSell = (newValue) => {
        if (newValue === "") setVolumeSell(newValue)
        else {
            newValue = Number(newValue)
            if (!isNaN(newValue)) {
                //if (newValue > maxAstra) newValue = Math.floor(maxAstra)
                setVolumeSell(newValue)
            }
        }
    }
    const changePercentBuy = (newValue) => {
        setVolumeBuy(Math.floor(newValue * maxTikixu / PriceBuy / 100))
        setPercentBuy(newValue)
    }



    const handleBuy = () => {
        if (PriceBuy !== "" && volumeBuy !== "") {
            Orders.Limit(access_token, PriceBuy, "buy", volumeBuy)
                .then(() => {
                    toast.success("Đặt lệnh mua thành công", {
                        theme: 'colored'
                    })
                    setPriceBuy('')
                    setVolumeBuy('')
                    setPercentBuy(0)
                })
                .catch(() => {
                    toast.error("Khối lượng tối thiểu là 2", {
                        theme: 'colored'
                    })
                })
        }
        else toast.error("Nhập đầy đủ giá và khối lượng", {
            theme: 'colored'
        })
    }

    const handleSell = () => {
        if (PriceSell !== "" && volumeSell !== "") {
            Orders.Limit(access_token, PriceSell, "sell", volumeSell)
                .then(() => {
                    toast.success("Đặt lệnh bán thành công", {
                        theme: 'colored'
                    })
                    setPriceSell('')
                    setVolumeSell('')
                })
                .catch(() => {
                    toast.error("Khối lượng tối thiểu là 2", {
                        theme: 'colored'
                    })
                })
        }
        else toast.error("Nhập đầy đủ giá và khối lượng", {
            theme: 'colored'
        })
    }

    return (
        <div className={cx('order-form')}>
            <div className={cx('buy-form')}>
                <div className={cx('price-buy')}>
                    <div className={cx('label')}>Giá</div>
                    <input type='text' value={PriceBuy} onChange={(e) => changePriceBuy(e.target.value)}></input>
                    <div className={cx('logo-token')}>
                        <img src={tikixu} alt='logo'></img>
                    </div>
                </div>
                <div className={cx('price-buy')}>
                    <div className={cx('label')}>KL</div>
                    <input type='text' value={volumeBuy} onChange={(e) => changeVolumeBuy(e.target.value)}></input>
                    <div className={cx('logo-token')}>
                        <img src={astra} alt='logo'></img>
                    </div>
                </div>
                <div className={cx('volume-slider-buy')}>
                    <Slider
                        style={{ margin: '10px 6px' }}
                        min={0}
                        max={100}
                        marks={{ 0: <></>, 25: <></>, 50: <></>, 75: <></>, 100: <></> }}
                        onChange={changePercentBuy}
                        value={percentBuy}
                    />
                </div>
                <div className={cx('previewAmount')}>
                    <div>Số lượng Xu cần thiết :</div>
                    <div>{PriceBuy * volumeBuy}</div>
                    <div className={cx('logo-token')}>
                        <img src={tikixu} alt='logo astra'></img>
                    </div>
                </div>
                <button className={cx('buy-button-buy')} onClick={handleBuy}>Mua</button>
            </div>
            <div className={cx('buy-form')}>
                <div className={cx('price-buy')}>
                    <div className={cx('label')}>Giá</div>
                    <input type='text' value={PriceSell} onChange={(e) => changePriceSell(e.target.value)}></input>
                    <div className={cx('logo-token')}>
                        <img src={tikixu} alt='logo'></img>
                    </div>
                </div>
                <div className={cx('price-buy')}>
                    <div className={cx('label')}>KL</div>
                    <input type='text' value={volumeSell} onChange={(e) => changeVolumeSell(e.target.value)}></input>
                    <div className={cx('logo-token')}>
                        <img src={astra} alt='logo'></img>
                    </div>
                </div>
                <div className={cx('volume-slider-buy')}>
                    <Slider
                        style={{ margin: '10px 6px' }}
                        min={0}
                        max={100}
                        marks={{ 0: <></>, 25: <></>, 50: <></>, 75: <></>, 100: <></> }}
                        onChange={(newValue) => setVolumeSell(Math.floor(newValue * maxAstra / 100))}
                        value={Math.floor(volumeSell / maxAstra * 100)}
                    />
                </div>
                <div className={cx('previewAmount')}>
                    <div>Số lượng Xu ước tính nhận được:</div>
                    <div>{PriceSell * volumeSell}</div>
                    <div className={cx('logo-token')}>
                        <img src={tikixu} alt='logo astra'></img>
                    </div>
                </div>
                <button className={cx('buy-button-sell')} onClick={handleSell}>Bán</button>
            </div>
        </div>
    );
}

export default Limit;