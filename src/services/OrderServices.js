import axios from 'axios'

export const getOrderList =async () => {

    let options = {
        url: 'https://api.tiki.vn/sandseel/api/v2/public/markets/asaxu/depth',
        method: 'get'
    }

    let data = axios(options)
    return await data
}