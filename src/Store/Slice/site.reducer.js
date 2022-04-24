import { combineReducers } from 'redux';

import  siteUserReducer from './Site/user.slice';
import  siteStartReducer from './Site/start.slice';
import  siteCategoryReducer from './Site/category.slice';
import  siteSearchReducer from './Site/search.slice';
import  siteContentReducer from './Site/content.slice';
import  siteDownloadReducer from './Site/download.slice';
import  siteCommentReducer from './Site/comment.slice';




import  siteLocalGeneralReducer from './Site/Local/general.slice';
export default combineReducers({
  siteUser:siteUserReducer,
  siteStart:siteStartReducer,
  siteCategory:siteCategoryReducer,
  siteSearch:siteSearchReducer,
  siteContent:siteContentReducer,
  siteDownload:siteDownloadReducer,
  siteComment:siteCommentReducer,




  siteLocalGeneral:siteLocalGeneralReducer
})
