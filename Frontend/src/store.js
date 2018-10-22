import { applyMiddleware, createStore, combineReducers} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { user } from './reducers/userReducer';
import { client } from './reducers/clientReducer';
import { weektime } from './reducers/weektimeReducer';

const middleware = applyMiddleware(thunk, logger);

const reducer = combineReducers({
    client: client,
    user: user,
    weektime: weektime
});

export const store = createStore(reducer, middleware);