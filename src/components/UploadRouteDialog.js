import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class UploadRouteDialog extends Component {

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
                    title="Dialog With Date Picker"
                    actions={actions}
                    modal={true}
                    open={this.props.show}
                    onRequestClose={this.props.cancel}
                >
                    <form>
                        <label htmlFor="file-import">Upload a File:</label>
                        <input
                            id="file-import"
                            type="file"
                            accept=".gpx, .tcx"
                            onChange={this.handleChange} />
                    </form>
                </Dialog>
            </div>
        );
    }

}

