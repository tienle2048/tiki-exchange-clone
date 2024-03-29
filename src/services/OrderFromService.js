import axios from 'axios'
import FormData from 'form-data'

const Limit =async (accesstoken,price,side,volume) => {
    const data = new FormData();
    data.append('price', price);
    data.append('side', side);
    data.append('volume', volume);

    let options = {
        url: 'https://api.tiki.vn/sandseel/api/v2/market/limit_orders',
        method: 'post',
        data,
        headers: {
            'Authorization': 'Bearer ' + accesstoken
        }
    }
    return await axios(options)
}

const Market =async (accesstoken,side,volume) => {
    const data = new FormData();
    data.append('side', side);
    if (side==='buy')data.append('amount', volume);
    else data.append('volume',volume)

    let options = {
        url: 'https://api.tiki.vn/sandseel/api/v2/market/market_orders',
        method: 'post',
        data,
        headers: {
            'Authorization': 'Bearer ' + accesstoken
        }
    }
    return await axios(options)
}




export const Orders = {
    Limit:Limit,
    Market:Market
}