import { alertConstants } from '../constants';

export function alert(state = {isalert:false}, action) {
  switch (action.type) {
    case alertConstants.ERROR:
      return {
        isalert:true,
        message: action.message.error.message
      };
    default:
      return state
  }
}