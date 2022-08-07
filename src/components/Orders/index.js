import handle from '../../assets/svg/arrows-up-down-left-right-solid.svg'
import { ListOrder, HistoryOrder } from './Component'

import { Tabs } from 'antd'


import styles from './Orders.module.scss'
import classNames from 'classnames/bind'
import './customAntd.css'

const cx = classNames.bind(styles)
const { TabPane } = Tabs;


function Orders() {

    return (
        <>
            <span className='drag-handle'>
                <img src={handle} alt='handle'></img>
            </span>
            <div className={cx('wrapper')}>
                <Tabs defaultActiveKey="1" destroyInactiveTabPane >
                    <TabPane tab="Đang xử lý" key="1">
                        <ListOrder />
                    </TabPane>
                    <TabPane tab="Lịch sử giao dịch" key="2">
                        <HistoryOrder />
                    </TabPane>
                </Tabs>
            </div>
        </>
    );
}

export default Orders;