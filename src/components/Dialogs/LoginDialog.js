import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { red400, white } from 'material-ui/styles/colors';
import './Dialogs.css';

const styles = {
    dialogContentStyle: {
        maxWidth: 400
    },
    inputStyle: {
        width: '100%'
    },
    errorBoxStyle: {
        backgroundColor: red400,
        color: white,
        padding: 10
    }
};

export default class LoginDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    handleStateChange = (field, e) => this.setState({ [field]: e.target.value });

    onEmailChange = (e) => this.handleStateChange('email', e);

    onPasswordChange = (e) => this.handleStateChange('password', e);

    /*eslint no-useless-escape: "off"*/
    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validate = (e) => {
        const { email, password } = this.state;
        if (email === '') {
            this.setState({ errors: { email: 'An email address is required' } })
            return;
        }
        if (!this.validateEmail(email)) {
            this.setState({ errors: { email: 'This must be a valid email address' } })
            return;
        }
        if (password === '') {
            this.setState({ errors: { password: 'A password is required' } })
            return;
        }
        this.props.loginAction(email, password)
            .then(() => this.props.cancel())
            .catch(error => {
                this.setState({ errors: { auth: error.message } });
            });
    }

    render() {
        const actions = [
            <FlatButton
                label="Sign In"
                primary={true}
                onClick={this.validate}
            />,
            <FlatButton
                label="Cancel"
                onClick={this.props.cancel}
            />
        ];

        return (
            <Dialog
                title="Sign In"
                className="dialog"
                actions={actions}
                modal={true}
                contentStyle={styles.dialogContentStyle}
                open={this.props.show}
                onRequestClose={this.props.cancel}
            >
                <div className="dialog-content">
                    {this.state.errors.auth && (
                        <div style={styles.errorBoxStyle}>
                            {this.state.errors.auth}
                        </div>
                    )}
                    <TextField
                        id="email"
                        type="email"
                        style={styles.inputStyle}
                        hintText="Enter your Email Address"
                        errorText={this.state.errors.email}
                        floatingLabelText="Email"
                        onChange={this.onEmailChange}
                    />
                    <TextField
                        id="password"
                        type="password"
                        style={styles.inputStyle}
                        hintText="Enter your Password"
                        errorText={this.state.errors.password}
                        floatingLabelText="Password"
                        onChange={this.onPasswordChange}
                    />
                </div>
            </Dialog>
        );
    }

}
