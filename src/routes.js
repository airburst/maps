import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Auth from './services/Auth';
import App from './containers/App';
// import Login from './components/Auth/Login';
import Callback from './components/Auth/Callback';

const history = createHistory();
const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
}

const Routes = () => {
    return (
        <Router history={history} component={App}>
            <Switch>
                <Route exact path="/login" render={() => (auth.login())} />
                <Route exact path="/callback" render={(props) => {
                    handleAuthentication(props);
                    return <Callback {...props} />
                }} />
                <Route path="/" render={(props) => <App auth={auth} {...props} />} />
            </Switch>
        </Router>
    );
}

export default Routes;
