import { combineReducers } from 'redux';
import  panelAccountReducer from './Panel/account.slice'
export default combineReducers({
  panelAccount:panelAccountReducer
})
