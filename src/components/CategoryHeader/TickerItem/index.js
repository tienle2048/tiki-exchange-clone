import classNames from 'classnames/bind'
import style from './TickerItem.module.scss'

const cx = classNames.bind(style)

function TickerItem({title,color,data,children}) {


    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('label')}>{title}</div>
            <div className={cx(color,'value')}>{children ? `${Intl.NumberFormat('de-DE').format(data)} ${children}`: data}</div>
        </div>
     );
}

export default TickerItem;