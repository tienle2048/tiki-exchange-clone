import { Table } from 'antd'

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
            key: 'type'
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
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                  text: 'hủy',
                  value: 'hủy',
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
              onFilter: (value, record) => record.status.startsWith(value)
        }

    ];

const data = [
    {
        key: '1',
        time: '12h',
        type: 'ban',
        amount: '100',
        price: '200',
        success:'50',
        status: 'hủy'
    },
    {
        key: '2',
        time: '12h',
        type: 'ban',
        amount: '100',
        price: '200',
        success:'50',
        status: 'khớp'
    },
    {
        key: '3',
        time: '12h',
        type: 'ban',
        amount: '100',
        price: '200',
        success:'50',
        status: 'khớp 1 phần'
    },
    {
        key: '4',
        time: '12h',
        type: 'ban',
        amount: '100',
        price: '200',
        success:'50',
        status: 'khớp'
    }
];

function HistoryOrder() {
    return ( 
            <div >
            <Table
                scroll={{ y: 140 }}
                expandedRowRender= {(record) => <p>{'ddawdawdw'}</p>}
                columns={columns}
                dataSource={data}
                pagination={{ position: ['none'] }}
            />
        </div>
     );
}

export default HistoryOrder;