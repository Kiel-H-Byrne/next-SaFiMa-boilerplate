//Redux
import { applyMiddleware, compose, createStore } from "redux";
import createRootReducer from "./../Reducers";
//Middleware
//Logger
import logger from "redux-logger";

//Router
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory, createMemoryHistory } from "history";

//Sagas
import createSagaMiddleware from "redux-saga";
import rootSaga from "./../Sagas";

// import Schemas from "./../api/schemas";

//Create Logger
const composeEnhancers = compose;

//Create Middleware
export const history = !process.browser
? createMemoryHistory() 
: createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

//Create Store

export function initializeStore() {
  const store = 
    process.env.NODE_ENV === "production"
    ? createStore(
        createRootReducer(history),
        applyMiddleware(routerMiddleware(history), sagaMiddleware)
      )
    : createStore(
        createRootReducer(history),
        // INJECTED_APP_STATE,
        composeEnhancers(
          applyMiddleware(
            routerMiddleware(history),
            logger,
            sagaMiddleware
          )
        )
      );

  sagaMiddleware.run(rootSaga);
  
  return store
  }
