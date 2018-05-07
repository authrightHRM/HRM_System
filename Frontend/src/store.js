import { applyMiddleware, createStore, combineReducers} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { user } from './reducers/userReducer';
import { weektime } from './reducers/weektimeReducer';

const middleware = applyMiddleware(thunk, logger);

const reducer = combineReducers({
    user: user,
    weektime: weektime
});

export const store = createStore(reducer, middleware);