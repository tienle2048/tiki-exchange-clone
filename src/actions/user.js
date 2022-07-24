import { userConstants } from '../constants';
import { userServices } from '../services';

export const userActions = {
    login,
    logout
};

function login(username, password) {
    userServices.login(username,password)

    return { type: userConstants.LOGIN_SUCCESS, user:'okla' } 
    
    

}

function logout() {
    userServices.logout();
    return { type: userConstants.LOGOUT };
}
