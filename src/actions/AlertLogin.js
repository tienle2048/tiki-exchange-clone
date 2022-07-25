import { alertConstants } from '../constants'

export const alertActions = {
    error
};


function error(message) {
    return { type: alertConstants.ERROR, message };
}
