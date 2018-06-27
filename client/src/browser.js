import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storeFactory from "./store/storeFactory";
//import { BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
//import createBrowserHistory from 'history/createBrowserHistory';
//import StudentHome from './components/ui/student/question/StudentHome';
//import createBrowserHistory from 'history/createBrowserHistory';
import Student from "./components/ui/student/Student";

//const history = createBrowserHistory();
//export default history;

//const history = createBrowserHistory();
// return a middleware enhanced store
const store = storeFactory();
let persistor = persistStore(store);
render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router basename="/">
        <Student />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
