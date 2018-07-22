import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { user } from './user.reducer';
import { post } from './post.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  user,
  post
});

export default rootReducer;