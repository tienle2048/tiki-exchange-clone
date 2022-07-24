import { combineReducers } from 'redux';
import {alert} from './AlertReducer'
import {authenticationReducer} from './AuthenticationReducer' 

const rootReducer = combineReducers({
  authen:authenticationReducer,
  alert: alert
});

export default rootReducer;