import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import './Dialogs.css';

const styles = {
    dialogContentStyle: {
        maxWidth: 400
    }
};

export default props => {
    const { show, remove, cancel } = props;
    const actions = [
        <FlatButton
            label="Do it"
            primary={true}
            onClick={remove}
        />,
        <FlatButton
            label="Cancel"
            onClick={cancel}
        />
    ];

    return (
        <Dialog
            title="Confirm Delete"
            className="dialog"
            actions={actions}
            modal={true}
            contentStyle={styles.dialogContentStyle}
            open={show}
            onRequestClose={cancel}
        >
            <div className="dialog-content">
                <p>Are you sure that you want to remove this route?</p>
                <p>This action cannot be undone.</p>
            </div>
        </Dialog>
    );
}
