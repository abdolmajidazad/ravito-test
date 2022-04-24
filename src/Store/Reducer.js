import { combineReducers } from 'redux'

import PanelReducer from './Slice/panel.reducer'
import SiteReducer from './Slice/site.reducer'
export default combineReducers({
  site: SiteReducer,
  panel: PanelReducer,
})
