import { createStore, combineReducers, applyMiddleware } from "redux";
import { sessionMiddlewareFactory, sessionReducer } from './session';

export type IAppState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    session: sessionReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(
        sessionMiddlewareFactory(),
    )
);

export default store;
