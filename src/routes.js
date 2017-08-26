import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Auth from './services/Auth';
import App from './containers/App';
// import Login from './components/Auth/Login';

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
                <Route path="/login" render={() => (auth.login())} />
                <Route path="/" render={(props) => {
                    handleAuthentication(props);
                    return <App auth={auth} {...props} />
                }} />
            </Switch>
        </Router>
    );
}

export default Routes;
