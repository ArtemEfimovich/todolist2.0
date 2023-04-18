import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import App from "./pages/App";
import {Provider} from "react-redux";
import {store} from "./services/store/store";
import {HashRouter} from "react-router-dom";

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>

    , document.getElementById('root'));


