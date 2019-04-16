import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import profileReducer from './profileReducer';
import tagReducer from './tagReducer';
import articleReducer from './articleReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  profile: profileReducer,
  tags: tagReducer,
  article: articleReducer
});

export default rootReducer;
