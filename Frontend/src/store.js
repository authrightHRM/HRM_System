import { applyMiddleware, createStore, combineReducers} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { user } from './Reducers/userReducer';
import { client } from './Reducers/clientReducer';
import { weektime } from './Reducers/weektimeReducer';

const middleware = applyMiddleware(thunk, logger);

const reducer = combineReducers({
    client: client,
    user: user,
    weektime: weektime
});

export const store = createStore(reducer, middleware);