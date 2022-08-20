import { Table, Tag } from 'antd'
import { orderService } from '../../../services/OrderTable';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import dateFormat from "dateformat";



function HistoryOrder() {
    const access_token = useSelector(state => state.authen).user.access_token
    const [data, setData] = useState([])

    const updateDataOrder = () => {
        orderService.historyOrder(access_token)
            .then((response) => {
                let data = response.data
                data = data.map((item) => {
                    let state = []
                    if (item.state === 'done') state = ["khớp"]
                    else if (parseInt(item.origin_volume) - parseInt(item.remaining_volume) > 0) state = ["khớp 1 phần"]
                    else state = ["Đã hủy"]

                    return {
                        key: item.id,
                        color: 'red',
                        time: dateFormat(item.created_at, "h:MM:ss, d/mm/yyyy"),
                        type: item.side === 'sell' ? 'bán' : 'mua',
                        amount: Intl.NumberFormat('de-DE').format(item.origin_volume),
                        price: item.price? Intl.NumberFormat('de-DE').format(item.price): "Thị trường",
                        success: parseInt(item.origin_volume) - parseInt(item.remaining_volume),
                        tags: state
                    }
                })
                setData(data)
                //console.log(data)
            })
            .catch((error) => {
                console.log('loi', error)
            })
    }

    useEffect(() => {
        updateDataOrder()
        const interval = setInterval(() => {
            updateDataOrder()
        }, 2000);
        return () => clearInterval(interval);
    }, [])

    const columns =
        [
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
                title: 'Trạng thái',
                dataIndex: 'tags',
                key: 'tags',
                render: (_, { tags }) => (
                    <>
                        {tags.map((tag) => {
                            let color

                            if (tag === 'Đã hủy') {
                                color = 'white';
                            }
                            if (tag === 'khớp') {
                                color = '#2DC26D';
                            }
                            if (tag === 'khớp 1 phần') {
                                color = '#FFC400';
                            }

                            return (
                                <Tag color={'#303341'} style={{ color: color, padding: '4px 6px', fontSize: '12px' }} key={tag}>
                                    {tag}
                                </Tag>
                            );
                        })}
                    </>
                ),
                filters: [
                    {
                        text: 'Đã hủy',
                        value: 'Đã hủy',
                    },
                    {
                        text: 'khớp',
                        value: 'khớp',
                    },
                    {
                        text: 'khớp 1 phần',
                        value: 'khớp 1 phần',
                    }
                ],
                onFilter: (value, record) => record.tags[0] === value
            }

        ];
    return (
        <div >
            <Table
                scroll={{ y: 240 }}
                expandedRowRender={(record) => <p>{'ddawdawdw'}</p>}
                columns={columns}
                dataSource={data}
                pagination={{ position: ['none'], pageSize: 100 }}
                rowClassName={"red"}
            />
        </div>
    );
}

export default HistoryOrder;