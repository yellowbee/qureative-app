import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import storeFactory from './store/storeFactory';
//import { BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import createBrowserHistory from 'history/createBrowserHistory';
//import StudentHome from './components/ui/student/question/StudentHome';
//import createBrowserHistory from 'history/createBrowserHistory';
import Student from './components/ui/student/Student';


//const history = createBrowserHistory();
//export default history;

//const history = createBrowserHistory();
// return a middleware enhanced store
const store = storeFactory();
render(
    <Provider store={store}>
        <MuiThemeProvider>
            <Router basename="/">
                <Student/>
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);

