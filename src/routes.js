import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import App from './containers/App';

const history = createHistory();

const Routes = () => {
    return (
        <Router history={history} component={App}>
            <Switch>
                <Route path="/" render={(props) => {
                    return <App {...props} />
                }} />
            </Switch>
        </Router>
    );
}

export default Routes;
