import styles from './Button.module.scss'
import classNames from 'classnames/bind';

const cx= classNames.bind(styles)

function Button({
    children,
    sell,
    buy,
    login,
    small,
    large,
    onClick
}) {


    const classes = cx('wrapper',{
        sell,
        buy,
        login,
        small,
        large
    })


    return ( 
        <button className={classes} onClick={onClick}>
            {children}
        </button>
     );
}

export default Button;