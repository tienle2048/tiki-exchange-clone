import handle from '../../assets/svg/arrows-up-down-left-right-solid.svg'




function Orders() {
    return ( 
        <>
            <span className='drag-handle'>
                <img src={handle} alt='handle'></img>
            </span>
        <div>
            Order
        </div>
        </>
     );
}

export default Orders;