import axios from 'axios'

const getMyOrder =async (accesstoken) => {
    let options = {
        url: 'https://api.tiki.vn/sandseel/api/v2/market/orders?market=asaxu&state[]=wait&state[]=pending',
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + accesstoken
        }
    }
    return await axios(options)
}

const getHistoryOrder =async (accesstoken) => {
    let options = {
        url: 'https://api.tiki.vn/sandseel/api/v2/market/orders?market=asaxu&state[]=done&state[]=cancel',
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + accesstoken
        }
    }
    return await axios(options)
}



export const orderService = {
    myOrder:getMyOrder,
    historyOrder:getHistoryOrder

}