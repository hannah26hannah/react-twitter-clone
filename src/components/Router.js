import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Profile from 'routes/Profile';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from './Navigation';
import { BrowserRouter } from 'react-router-dom';

const AppRouter = ({refreshuser, isLoggedIn, userObj, setIsLoggedIn}) => {
    return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Switch>
                {isLoggedIn ? 
                <>
                    <Route exact path='/'>
                        <Home userObj={userObj} />
                    </Route> 
                    <Route exact path='/profile'>
                        <Profile userObj={userObj} setIsLoggedIn={setIsLoggedIn} refreshuser={refreshuser} />
                    </Route> 
                </> :
                <>
                    <Route exact path='/'>
                        <Auth />
                    </Route>
                    
                </>
                }                
            </Switch>
        </Router>
        </BrowserRouter>
    )
}

export default AppRouter;