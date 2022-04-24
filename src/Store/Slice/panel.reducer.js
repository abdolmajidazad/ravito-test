import { combineReducers } from 'redux';
import  panelUserReducer from './Panel/user.slice'
export default combineReducers({
  panelUser:panelUserReducer
})
