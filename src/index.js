import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import UserProvider from './store/UserProvider';

import './index.css';
import './App.css';
import './blog.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    (
    <UserProvider>
        <App />
    </UserProvider>
    )
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
