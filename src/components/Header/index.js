import classNames from 'classnames/bind'
import styles from './Header.module.scss'

import logotiki from '../../assets/images/logotiki.png'
import astra from '../../assets/images/astra.png'


import { faUser } from '@fortawesome/free-regular-svg-icons'
import {faGear} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const cx = classNames.bind(styles)
function Header() {
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
            <div className={cx('rigth')}>
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
                <div className={cx('icon')}>
                    <FontAwesomeIcon className={cx('user')} icon={faUser} />
                </div>
                <div className={cx('icon')}>
                    <FontAwesomeIcon className={cx('setting')} icon={faGear} />
                </div>

            </div>
        </div>
    );
}

export default Header;