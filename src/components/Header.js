import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';
import RoutesIcon from 'material-ui/svg-icons/action/bookmark-border';
import SignOutIcon from 'material-ui/svg-icons/action/lock-open';
import { history } from '../routes';

const SIGN_OUT = 'Sign out';
const PLANNER = 'My Routes';
const HELP = 'Help';

class Login extends Component {
    static muiName = 'FlatButton';

    render() {
        return (
            <FlatButton {...this.props} label="Sign In" />
        );
    }
}

const Logged = (props) => (
    <IconMenu
        {...props}
        iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
        <MenuItem primaryText={HELP} leftIcon={<HelpIcon />} />
        <MenuItem primaryText={PLANNER} leftIcon={<RoutesIcon />}/>
        <MenuItem primaryText={SIGN_OUT} leftIcon={<SignOutIcon />}/>
    </IconMenu>
);

Logged.muiName = 'IconMenu';

export default class Header extends Component {

    logout = () => {
        this.props.logout();
        this.props.clearRoute();
        this.forceUpdate(); // Re-centre map
    }

    goToRouteList = () => {
        history.push('/routes');
    }

    handleChange = (event, { props }) => {
        const { primaryText } = props;
        if (primaryText === SIGN_OUT) { this.logout(); }
        if (primaryText === PLANNER) { this.goToRouteList(); }
        if (primaryText === HELP) { console.log('Create a help page') }
    };

    render() {
        const { isAuthenticated } = this.props.user;

        return (
            <header className="header">
                <AppBar
                    title="Route Planner"
                    iconElementRight={isAuthenticated ?
                        <Logged onItemTouchTap={this.handleChange}/>
                        : <Login onClick={this.props.login} />
                    }
                />
            </header>
        );
    }
}

//iconElementLeft={<IconButton><NavigationClose /></IconButton>}
