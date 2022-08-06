import { Table,Progress } from 'antd'

const columns =
    [
        {
            title: '',
            dataIndex: 'percent',
            key: 'percent',
            width:'5%'
        },
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
            title: '',
            dataIndex: 'action',
            key: 'action',
        }

    ];

const data = [
    {
        key: '1',
        percent:<Progress type="circle" percent={75} width={40} strokeWidth={10}/>,
        time: '12h',
        type: 'ban',
        amount: '100',
        price: '200',
        success: '50'
    },
    {
        key: '2',
        percent:<Progress type="circle" percent={25} width={40} strokeWidth={10}/>,
        time: '12h',
        type: 'ban',
        amount: '100',
        price: '200',
        success: '50'
    },
    {
        key: '3',
        percent:<Progress type="circle" percent={50} width={40} strokeWidth={10}/>,
        time: '12h',
        type: 'ban',
        amount: '100',
        price: '200',
        success: '50'
    },
    {
        key: '4',
        percent:<Progress type="circle" percent={33} width={40} strokeWidth={10}/>,
        time: '12h',
        type: 'ban',
        amount: '100',
        price: '200',
        success: '50'
    }
];



function ListOrder() {
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

export default ListOrder;