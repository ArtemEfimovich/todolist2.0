import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import AppWithRedux from "./pages/AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./services/store/store";

ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>
    , document.getElementById('root'));


