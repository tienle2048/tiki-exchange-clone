import classNames from 'classnames/bind'
import style from './Market.module.scss'


import { Orders } from '../../../services'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Slider } from 'antd'
import { toast } from 'react-toastify';

import astra from '../../../assets/images/astra.png'
import tikixu from '../../../assets/svg/tikixu.svg'

const cx = classNames.bind(style)

function Market() {

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
    const [percentSell, setPercentSell] = useState('')

    
    const changeVolumeBuy = (newValue) => {
        if (newValue === "") setVolumeBuy(newValue)
        else {
            newValue = Number(newValue)
            if (!isNaN(newValue)) {
                if (newValue>maxTikixu) newValue=maxTikixu
                setVolumeBuy(newValue)
                setPercentBuy(Math.floor(newValue/maxTikixu*100))
            }
        }
    }
    const changeVolumeSell = (newValue) => {
        if (newValue === "") setVolumeSell(newValue)
        else {
            newValue = Number(newValue)
            if (!isNaN(newValue)) {
                if (newValue>maxAstra) newValue=Math.floor(maxAstra)
                setVolumeSell(newValue)
                setPercentSell(Math.floor(newValue/maxAstra*100))
            }
        }
    }
    const changePercentBuy = (newValue) => {
        setVolumeBuy(Math.floor(newValue * maxTikixu / 100))
        setPercentBuy(newValue)
    }
    const changePercentSell = (newValue) => {
        setVolumeSell(Math.floor(newValue * maxAstra / 100))
        setPercentSell(newValue)
    }

    const handleBuy = () => {
        if (volumeBuy !== "") {
            Orders.Market(access_token, "buy", volumeBuy)
            .then(()=>{
                toast.success("Đặt lệnh mua thành công", {
                    theme: 'colored'
                })
                setPriceBuy('')
                setVolumeBuy('')
                setPercentBuy(0)
            })
            .catch(()=>{
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
        if (volumeSell !== "") {
            Orders.Market(access_token, "sell", volumeSell)
            .then(()=>{
                toast.success("Đặt lệnh bán thành công", {
                    theme: 'colored'
                })
                setPriceSell('')
                setVolumeSell('')
            })
            .catch(()=>{
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
                    <input type='text' value={"Thị trường"} disabled></input>
                    <div className={cx('logo-token')}>
                        <img src={tikixu} alt='logo'></img>
                    </div>
                </div>
                <div className={cx('price-buy')}>
                    <div className={cx('label')}>KL</div>
                    <input type='text' value={volumeBuy} onChange={(e) => changeVolumeBuy(e.target.value)}></input>
                    <div className={cx('logo-token')}>
                        <img src={tikixu} alt='logo'></img>
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
                    <div>Số lượng Astra ước tính nhận được:</div>
                    <div>{PriceBuy * volumeBuy}</div>
                    <div className={cx('logo-token')}>
                        <img src={astra} alt='logo astra'></img>
                    </div>
                </div>
                <button className={cx('buy-button-buy')} onClick={handleBuy}>Mua</button>
            </div>
            <div className={cx('buy-form')}>
                <div className={cx('price-buy')}>
                    <div className={cx('label')}>Giá</div>
                    <input type='text' value={"Thị trường"} disabled></input>
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
                        onChange={changePercentSell}
                        value={percentSell}
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

export default Market;