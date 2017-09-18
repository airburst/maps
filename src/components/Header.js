import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { white } from 'material-ui/styles/colors';

const loginButtonStyle = {
    color: white,
    margin: 0,
    marginRight: -24,
    minWidth: 0
};

export default class Header extends Component {

    logout = () => {
        this.props.logout();
        this.props.clearRoute();
        this.forceUpdate(); // Re-centre map
    }

    render() {
        const { isAuthenticated } = this.props.user;
        // display name and profile button
        return (
            <header className="header">
                <Toolbar>
                    <ToolbarGroup>
                        {!isAuthenticated && (
                            <FlatButton
                                label="Sign In"
                                style={loginButtonStyle}
                                labelStyle={{ padding: 12 }}
                                onClick={this.props.login} />
                        )}
                        {isAuthenticated && (
                            <FlatButton
                                label="Sign Out"
                                style={loginButtonStyle}
                                labelStyle={{ padding: 12 }}
                                onClick={this.logout} />
                        )}
                    </ToolbarGroup>
                </Toolbar>
            </header>
        );
    }
}
