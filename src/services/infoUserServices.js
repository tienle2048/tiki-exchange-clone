import axios from 'axios'

const getInfoUser = (accesstoken) => {
    let options = {
        url: 'https://api.tiki.vn/v2/me',
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + accesstoken,
            'x-access-token': accesstoken
        }
    }
    return axios(options)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log('getinfouser catch', error)
            return Promise.reject(error)
        })
}

const getUserProperty = (accesstoken) => {

    let options = {
        url: 'https://api.tiki.vn/sandseel/api/v2/account/me/balances',
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + accesstoken,
            'x-access-token': accesstoken
        }
    }
    return axios(options)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log('getinfouser then', error)
            return Promise.reject(error)
        })
}

export const infoUserServices = {
    info: getInfoUser,
    property: getUserProperty
}