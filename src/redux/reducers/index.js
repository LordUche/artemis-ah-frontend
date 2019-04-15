import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import tagReducer from './tagReducer';
import articleReducer from './articleReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  tags: tagReducer,
  article: articleReducer
});

export default rootReducer;
