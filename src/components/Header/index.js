import classNames from 'classnames/bind'
import styles from './Header.module.scss'

import logotiki from '../../assets/images/logotiki.png'
import astra from '../../assets/images/astra.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'

import Tippy from '@tippyjs/react';

import {useDispatch,useSelector} from 'react-redux'

import {userActions} from "../../actions/user"


const cx = classNames.bind(styles)
function Header() {

    const dispatch =useDispatch()

    const handleLogout = ()=>{
        dispatch(userActions.logout())
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <div className={cx('logo')}>
                    <img src={logotiki} alt='logo'></img>
                </div>
                <div className={cx('rewards')}>
                    <a href="https://tiki.vn/sep" target="_blank" rel="noreferrer">Tiki Rewards</a>
                    <a href="https://tiki.vn/sep" target="_blank" rel="noreferrer">Góp ý</a>
                </div>
            </div>
            <div className={cx('rigth')} id="parent">
                <div className={cx('label')}>Tài sản của tôi:</div>
                <div className={cx('astra')}>
                    <img src={astra} alt='logo'></img>
                    <div>1000</div>
                </div>
                <div className={cx('okla')}></div>
                <div className={cx('tikixu')}>
                    <img src={astra} alt='logo'></img>
                    <div>1000</div>
                </div>
                <div className={cx('okla')}></div>
                <Tippy
                    placement='bottom-start'
                    interactive
                    content={
                        <div tabIndex="0">
                            <ul className={cx('dropdown')}>
                                <li className={cx('userinfo')}>
                                    <div className={cx('avatar')}>
                                        <img src={astra} alt='logo'></img>
                                    </div>
                                    <div>
                                        <div>tien le </div>
                                        <div>leviettien456789@gmail.com</div>
                                    </div>
                                </li>
                                <li className={cx('bar')}></li>
                                <li className={cx('logout')} onClick={handleLogout}>Đăng xuất</li>
                            </ul>
                        </div>
                    }
                >
                    <div className={cx('icon')} aria-expanded="false">
                        <FontAwesomeIcon className={cx('user')} icon={faUser} />
                    </div>
                </Tippy>
                <div className={cx('icon')}>
                    <FontAwesomeIcon className={cx('setting')} icon={faGear} />
                </div>

            </div>
        </div>
    );
}

export default Header;