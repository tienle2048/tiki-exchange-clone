import axios from 'axios'

const LENGHT_DATA=500

const getDataChart5m =async () => {

    const date=Math.floor(Date.now() / 1000)

    let options = {
        url: `https://api.tiki.vn/sandseel/api/v2/public/markets/asaxu/klines?period=5&time_from=${date-LENGHT_DATA*60*5}&time_to=${date}`,
        method: 'get'
    }

    let data = axios(options)
    return await data
}

const getDataChart15m =async () => {

    const date=Math.floor(Date.now() / 1000)

    let options = {
        url: `https://api.tiki.vn/sandseel/api/v2/public/markets/asaxu/klines?period=15&time_from=${date-LENGHT_DATA*60*15}&time_to=${date}`,
        method: 'get'
    }

    let data = axios(options)
    return await data
}

const getDataChart30m =async () => {

    const date=Math.floor(Date.now() / 1000)

    let options = {
        url: `https://api.tiki.vn/sandseel/api/v2/public/markets/asaxu/klines?period=30&time_from=${date-LENGHT_DATA*60*30}&time_to=${date}`,
        method: 'get'
    }

    let data = axios(options)
    return await data
}

const getDataChart60m =async () => {

    const date=Math.floor(Date.now() / 1000)

    let options = {
        url: `https://api.tiki.vn/sandseel/api/v2/public/markets/asaxu/klines?period=60&time_from=${date-LENGHT_DATA*60*60}&time_to=${date}`,
        method: 'get'
    }

    let data = axios(options)
    return await data
}

const getDataChart240m =async () => {

    const date=Math.floor(Date.now() / 1000)

    let options = {
        url: `https://api.tiki.vn/sandseel/api/v2/public/markets/asaxu/klines?period=240&time_from=${date-LENGHT_DATA*60*240}&time_to=${date}`,
        method: 'get'
    }

    let data = axios(options)
    return await data
}

const getDataChart1440m =async () => {

    const date=Math.floor(Date.now() / 1000)

    let options = {
        url: `https://api.tiki.vn/sandseel/api/v2/public/markets/asaxu/klines?period=1440&time_from=${date-LENGHT_DATA*60*1440}&time_to=${date}`,
        method: 'get'
    }

    let data = axios(options)
    return await data
}

const getDataChart10080m =async () => {

    const date=Math.floor(Date.now() / 1000)

    let options = {
        url: `https://api.tiki.vn/sandseel/api/v2/public/markets/asaxu/klines?period=10_080&time_from=${date-LENGHT_DATA*60*10080}&time_to=${date}`,
        method: 'get'
    }

    let data = axios(options)
    return await data
}


export const getDateChart ={
    period5m :getDataChart5m,
    period15m :getDataChart15m,
    period30m :getDataChart30m,
    period1h :getDataChart60m,
    period4h :getDataChart240m,
    period1d :getDataChart1440m,
    period1w :getDataChart10080m,

}