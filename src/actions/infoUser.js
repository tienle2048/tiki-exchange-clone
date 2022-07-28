import { infoConstants } from '../constants';
import { infoUserServices } from '../services';

const info = (token) => {
    return dispatch => {
        infoUserServices.info(token)
            .then(data => {
                dispatch({ type: infoConstants.INFO, data })
            })
            .catch(error=>{
                console.log(error)
            })
    }
}

const property = (token) => {
    return dispatch => {
        infoUserServices.property(token)
            .then(data => {
                dispatch({ type: infoConstants.PROPERTY, data })
            })
            .catch(error=>{
                console.log(error)
            })
    }
}

export const infoAction = {
    info,
    property
}