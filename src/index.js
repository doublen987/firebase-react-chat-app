import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import chatReducer from './store/reducers/chat';
import authReducer from './store/reducers/auth';
import settingsReducer from './store/reducers/settings';
import * as firebase from 'firebase';

    var config = {
        apiKey: "AIzaSyDHeR32hMywAUR3q-68bPcIJ8r3Vo3jUJE",
        authDomain: "my-chat-app-4dbb1.firebaseapp.com",
        databaseURL: "https://my-chat-app-4dbb1.firebaseio.com",
        projectId: "my-chat-app-4dbb1",
        storageBucket: "my-chat-app-4dbb1.appspot.com",
        messagingSenderId: "630152829754"
    };
    firebase.initializeApp(config);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    chat: chatReducer,
    auth: authReducer,
    settings: settingsReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>                        
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
