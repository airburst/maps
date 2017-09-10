import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import RouteList from './containers/RouteList';
import Map from './containers/Map';

const history = createHistory();

const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/routes" component={RouteList} />
                <Route path="/" render={(props) => {
                    return <Map {...props} />
                }} />
            </Switch>
        </Router>
    );
}

export default Routes;
