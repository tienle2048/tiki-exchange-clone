import classNames from 'classnames/bind'
import style from './OrderForm.module.scss'

import handle from '../../assets/svg/arrows-up-down-left-right-solid.svg'

import Limit from './Limit'
import Market from './Market'

import { Tabs } from 'antd'


const cx = classNames.bind(style)
const { TabPane } = Tabs;

function OrderForm() {
    return (
        <>
            <span className='drag-handle'>
                <img src={handle} alt='handle'></img>
            </span>
            <div className={cx('wrapper')}>
                <Tabs defaultActiveKey="1" destroyInactiveTabPane >
                    <TabPane tab="Lệnh chờ" key="1">
                        <Limit />
                    </TabPane>
                    <TabPane tab="Lệnh nhanh" key="2">
                        <Market />
                    </TabPane>
                </Tabs>
            </div>
        </>
    );
}

export default OrderForm;