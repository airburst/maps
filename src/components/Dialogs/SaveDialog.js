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

export default class SaveDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'New Route',
            errors: {}
        }
    }

    handleStateChange = (field, e) => this.setState({ [field]: e.target.value });

    onNameChange = (e) => this.handleStateChange('name', e);

    validate = (e) => {
        const { name } = this.state;
        if (name === '') {
            this.setState({ errors: { name: 'A route name is required' } })
            return;
        }
        this.props.setRouteName(name);
        this.props.save()
            .then(() => this.props.cancel())
            .catch(error => {
                this.setState({ errors: { auth: error.message } });
            });
    }

    render() {
        const actions = [
            <FlatButton
                label="Save"
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
                title="Save Route"
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
                        id="name"
                        style={styles.inputStyle}
                        hintText="Enter a name for your route"
                        errorText={this.state.errors.name}
                        floatingLabelText="Route name"
                        onChange={this.onNameChange}
                    />
                </div>
            </Dialog>
        );
    }

}
