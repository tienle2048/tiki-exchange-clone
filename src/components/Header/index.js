import classNames from 'classnames/bind'
import styles from './Header.module.scss'

import logotiki from '../../assets/images/logotiki.png'
import astra from '../../assets/images/astra.png'

import Button from '../Globalcomponents/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'

import Tippy from '@tippyjs/react';


const cx = classNames.bind(styles)
function Header() {

    let islogin = true
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
                {islogin ?
                    <>
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
                            render={attrs => (
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
                                    <li className={cx('logout')}>Đăng xuất</li>
                                </ul>
                                </div>
                            )}
                        >
                            <div className={cx('icon')} aria-expanded="false">
                                <FontAwesomeIcon className={cx('user')} icon={faUser} />
                            </div>
                        </Tippy>




                        <div className={cx('icon')}>
                            <FontAwesomeIcon className={cx('setting')} icon={faGear} />
                        </div>
                    </> :
                    <Button login onClick={() => console.log('okla')}>
                        Đăng nhập
                    </Button>
                }
            </div>
        </div>
    );
}

export default Header;