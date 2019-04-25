import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import profileReducer from './profileReducer';
import tagReducer from './tagReducer';
import articleReducer from './articleReducer';
import commentReducer from './commentReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  profile: profileReducer,
  tags: tagReducer,
  article: articleReducer,
  comments: commentReducer,
});

export default rootReducer;
