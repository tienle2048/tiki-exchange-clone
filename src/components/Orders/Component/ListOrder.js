import { Table, Progress, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react';
import { orderService } from '../../../services/OrderTable';
import { useSelector } from 'react-redux'



function ListOrder() {
    const access_token = useSelector(state => state.authen).user.access_token
    const [data, setData] = useState([])


    

    const updateDataOrder = () => {
        orderService.myOrder(access_token)
            .then((response) => {
                let data = response.data
                data = data.map((item) => {
                    return {
                        key: item.id,
                        percent: <Progress type="circle" percent={Math.round((100 - parseInt(item.remaining_volume) / parseInt(item.origin_volume) * 100))} width={40} strokeWidth={10} className="color-text" />,
                        time: item.created_at,
                        type: item.side === 'sell' ? 'bán' : 'mua',
                        amount: item.origin_volume,
                        price: item.price,
                        success: parseInt(item.origin_volume) - parseInt(item.remaining_volume)
                    }
                })
                setData(data)
                //console.log(data)
            })
            .catch((error) => {
                console.log('loi', error)
            })
    }

    const handleCancelOrder = (record) => {
        orderService.cancelOrder(access_token, record.key)
        .then(()=>{
            updateDataOrder()
        })
        .catch(error=>{
            console.log(error)
        })
        
        console.log(record.key)
    }
    useEffect(() => {
        const interval = setInterval(() => {
            updateDataOrder()
          }, 2000);
          return () => clearInterval(interval);
    }, [])

    const columns =
        [
            {
                title: '',
                dataIndex: 'percent',
                key: 'percent',
                width: '5%'
            },
            {
                title: 'Thời gian',
                dataIndex: 'time',
                key: 'time',
            },
            {
                title: 'Loại giao dịch',
                dataIndex: 'type',
                key: 'type',
                render(text, record) {
                    return {
                        props: {
                            style: { color: text === 'bán' ? "#FF424E" : "#2DC26D" }
                        },
                        children: text
                    };
                }
            },
            {
                title: 'Số lượng',
                dataIndex: 'amount',
                key: 'amount',
            },
            {
                title: 'Giá giao dịch',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'KL đã khớp',
                dataIndex: 'success',
                key: 'success',
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => (
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleCancelOrder(record)}>
                        Hủy lệnh
                    </Button>
                ),
            }

        ];
    return (
        <div >
            <Table
                scroll={{ y: 140 }}
                expandedRowRender={(record) => <p>{'ddawdawdw'}</p>}
                columns={columns}
                dataSource={data}
                pagination={{ position: ['none'] }}
            />
        </div>
    );
}

export default ListOrder;