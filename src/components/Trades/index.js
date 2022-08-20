import classNames from "classnames/bind";
import styles from "./Trades.module.scss"

const cx = classNames.bind(styles)

function Trades() {
    return ( 
        <div className={cx('wrapper')}>
            Các lệnh khớp gần đây &#40; tiki chưa có api này &#41;
        </div>
     );
}

export default Trades;