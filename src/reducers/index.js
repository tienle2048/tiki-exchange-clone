import { combineReducers } from 'redux';
import {alert} from './AlertReducer'
import {authenticationReducer} from './AuthenticationReducer' 
import { infoUserreducer } from './infoUserReducer';

const rootReducer = combineReducers({
  authen:authenticationReducer,
  alert: alert,
  info: infoUserreducer
});

export default rootReducer;