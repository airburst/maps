import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import DownloadIcon from 'material-ui/svg-icons/file/file-download';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';
import SaveIcon from 'material-ui/svg-icons/content/save';
import UndoIcon from 'material-ui/svg-icons/content/undo';
import BikeIcon from 'material-ui/svg-icons/maps/directions-bike';
import WalkIcon from 'material-ui/svg-icons/maps/directions-walk';
import SearchIcon from 'material-ui/svg-icons/action/search';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

export default class Header extends Component {

    render() {
        return (
            <header className="header">
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <ToolbarTitle text="Options" />
                        <IconButton><SearchIcon /></IconButton>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <IconButton><BikeIcon /></IconButton>
                        <IconButton><WalkIcon /></IconButton>
                        <IconButton><CloseIcon /></IconButton>
                        <IconButton><UndoIcon /></IconButton>
                        <IconButton><SaveIcon /></IconButton>
                        <IconButton><DownloadIcon /></IconButton>
                        <IconButton><UploadIcon /></IconButton>
                    </ToolbarGroup>
                </Toolbar>
                />
            </header>
        );

    }
}
