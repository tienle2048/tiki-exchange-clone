import axios from 'axios'
import FormData from 'form-data'

const login = (username, password) => {
    const data = new FormData();
    data.append('device_id', 'b801c965-63b8-51d0-fa15-b35e75c73afb');
    data.append('email', username);
    data.append('grant_type', 'password');
    data.append('is_sso', 'true');
    data.append('password', password);
    data.append('referer', 'https://exchange.tiki.vn/');

    let options = {
        url: 'https://api.tiki.vn/v3/tokens',
        method: 'post',
        data
    }
    return axios(options)
        .then(response=>{
            let user = response.data
            if (user.access_token){
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user
        })
        .catch(function (error) {
            console.log(error.response.data);
        })
}

const logout=()=>{
    localStorage.removeItem('user');
}


export const userServices = {
    login,
    logout
}