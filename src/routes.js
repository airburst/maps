import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import RouteList from './components/RouteList';
import Map from './components/Map';
import Embed from './components/Embed';

export const history = createHistory();

const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route
                    exact
                    path="/routes"
                    render={(props) => <RouteList {...props} />} />
                <Route
                    exact
                    path="/embed/:id"
                    render={(props) => <Embed {...props} />} />
                <Route
                    path="/"
                    render={(props) => <Map {...props} />} />
            </Switch>
        </Router>
    );
}

export default Routes;

const goToRouteList = () => {
    history.push('/routes');
};

const goToPlanner = () => {
    history.push('/route');
};

export {
    goToRouteList,
    goToPlanner
};
