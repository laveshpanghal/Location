import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./Reducers/RootReducer";
import thunk from "redux-thunk";

export default function configureStore(initialState) {

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

  return createStore (
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  )
}
