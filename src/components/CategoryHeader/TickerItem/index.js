import classNames from 'classnames/bind'
import style from './TickerItem.module.scss'

const cx = classNames.bind(style)

function TickerItem({title,color,children}) {


    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('label')}>{title}</div>
            <div className={cx(color,'value')}>{children}</div>
        </div>
     );
}

export default TickerItem;