import classNames from "classnames/bind"
import styles from "./Login.module.scss"
import {useState} from 'react'

const cx =classNames.bind(styles)

function Login() {
    const [Email,setEmail] =useState("")
    const [Pass,setPass] =useState("")

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-login')}>
                <div className={cx('left')}>
                    <div className={cx('heading')}>
                        <h4>Đăng nhập bằng email</h4>
                        <p>Nhập email và mật khẩu tài khoản Tiki</p>
                    </div>
                    <div className={cx('form')}>
                        <div className={cx('input',{'input-fill':Email!==""})} >
                            <input type={"text"} placeholder="abc@gmail.com" value={Email} onChange={(e)=>setEmail(e.target.value)}></input>
                        </div>
                        <div className={cx('input',{'input-fill':Pass!==""})}>
                            <input type="password" placeholder="Mật khẩu" value={Pass} onChange={(e)=>setPass(e.target.value)}></input>
                        </div>
                        <button>Đăng nhập</button>
                    </div>
                </div>
                <div className={cx('right')}>
                    <img src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png" height={'203'} alt={'logo'}></img>
                    <div className={cx('content')}>
                        <h1>Mua sắm tại Tiki</h1>
                        <span>Siêu ưu đãi mỗi ngày</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;