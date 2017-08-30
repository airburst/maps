import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import './Dialogs.css';

const dialogContentStyle = {
    width: 480,
    maxWidth: 480,
};

export default class ImportRouteDialog extends Component {

    handleChange = (e) => {
        e.preventDefault();
        this.props.import(e);
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.cancel}
            />
        ];

        return (
            <div>
                <Dialog
                    title="Import Route"
                    className="dialog"
                    actions={actions}
                    modal={true}
                    contentStyle={dialogContentStyle}
                    open={this.props.show}
                    onRequestClose={this.props.cancel}
                >
                    <div className="dialog-content">
                        <label htmlFor="file-import">
                            Select a Garmin GPX or TCX file to upload
                        </label>
                        <RaisedButton
                            containerElement="label"
                            label="Choose file to import"
                            labelColor="white"
                            primary>
                            <input
                                onChange={this.handleChange}
                                accept=".gpx, .tcx"
                                style={{ display: 'none' }}
                                type="file"
                            />
                        </RaisedButton>
                    </div>
                </Dialog>
            </div>
        );
    }

}
