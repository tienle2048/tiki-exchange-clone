import { userConstants } from '../constants';
import { userServices } from '../services';
import {alertActions} from './AlertLogin'



const login = (username, password) => {
    return dispatch => {
        userServices.login(username, password)
            .then(user => {
                dispatch({ type: userConstants.LOGIN_SUCCESS, user })
            })
            .catch(error=>{
                dispatch(alertActions.error(error))
                console.log(error)
            })
    }
}

const logout = () => {
    userServices.logout();
    return { type: userConstants.LOGOUT };
}

export const userActions = {
    login,
    logout
};