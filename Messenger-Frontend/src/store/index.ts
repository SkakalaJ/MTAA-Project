import { createStore, combineReducers, applyMiddleware } from "redux";

export type IAppState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({

});

const store = createStore(
    rootReducer,
    applyMiddleware(

    )
);

export default store;
