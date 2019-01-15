import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { firebase } from './components/firebase';
import {getUser} from './components/utils';



import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './rootReducer';

const store = createStore( rootReducer,
                           window.__REDUX_DEVTOOLS_EXTENSION__ &&
                           window.__REDUX_DEVTOOLS_EXTENSION__() );

const initSetUp = async (user) => {
        //this initilaises the app (redux) with the signed in user and retrieves points of the user
        store.dispatch({ type: "SET_AUTHENTICATED_USER", user });

        if(user)
        {
                try
                {
                        const users = await getUser('users', user.uid);
                       
                        users.forEach((user) => {
                                const { points, display_name } = user.data();
                                store.dispatch({ type: "SET_USER_POINTS", points });
                                store.dispatch({ type: "SET_DISPLAY_NAME", display_name });
                            });     
                } 
                catch(error)
                {
                        console.log("error", error)
                }
        
        }

}

firebase.auth().onAuthStateChanged( user => {
        if(user) initSetUp(user);
        ReactDOM.render(<Provider store={store}><App loggedIn = {!!user} user = {user}/></Provider>, document.getElementById('root'));
});

