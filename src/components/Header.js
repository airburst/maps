import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import DownloadIcon from 'material-ui/svg-icons/file/file-download';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';
import SaveIcon from 'material-ui/svg-icons/content/save';
import UndoIcon from 'material-ui/svg-icons/content/undo';
import BikeIcon from 'material-ui/svg-icons/maps/directions-bike';
import WalkIcon from 'material-ui/svg-icons/maps/directions-walk';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { white } from 'material-ui/styles/colors';
import SearchInput from '../containers/SearchInput';
import ImportRouteDialog from './Dialogs/ImportRouteDialog';

const tooltipStyle = {
    fontSize: '16px'
};

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

    handleChange = (e) => {
        e.preventDefault();
        this.props.import(e);
    }

    render() {
        const { isAuthenticated } = this.props.user;        
        // display name and profile button
        return (
            <header className="header">
                <Toolbar>
                    <ToolbarGroup>
                        <SearchInput />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        {
                            this.props.followsRoads ?
                                <IconButton
                                    tooltip="Route follows roads"
                                    tooltipStyles={tooltipStyle} >
                                    <BikeIcon
                                        onClick={this.props.toggleFollowsRoads}
                                        color={white} />
                                </IconButton> :
                                <IconButton
                                    tooltip="Point to point route"
                                    tooltipStyles={tooltipStyle}>
                                    <WalkIcon
                                        onClick={this.props.toggleFollowsRoads}
                                        color={white} />
                                </IconButton>
                        }
                        {
                            this.props.hasTrack ? (
                                <div>
                                    <IconButton
                                        tooltip="Clear route"
                                        tooltipStyles={tooltipStyle}>
                                        <CloseIcon
                                            onClick={this.props.clearRoute}
                                            color={white} />
                                    </IconButton>
                                    <IconButton
                                        tooltip="Undo"
                                        tooltipStyles={tooltipStyle}>
                                        <UndoIcon
                                            onClick={this.props.removePoint}
                                            color={white} />
                                    </IconButton>
                                    {isAuthenticated && (
                                        <IconButton
                                            tooltip="Save"
                                            tooltipStyles={tooltipStyle}>
                                            <SaveIcon
                                                onClick={this.props.save}
                                                color={white} />
                                        </IconButton>
                                    )}
                                    <IconButton
                                        tooltip="Export"
                                        tooltipStyles={tooltipStyle}>
                                        <DownloadIcon
                                            onClick={this.props.export}
                                            color={white} />
                                    </IconButton>
                                </div>
                            ) : <div />
                        }
                        <IconButton
                            tooltip="Import"
                            tooltipStyles={tooltipStyle}>
                            <UploadIcon
                                onClick={this.props.showImportModal}
                                color={white} />
                        </IconButton>
                        {!isAuthenticated && (
                            <FlatButton
                                label="Sign In"
                                style={loginButtonStyle}
                                labelStyle={{ padding: 12 }}
                                onClick={() => this.props.login('mark@fairhursts.net', 'audiolab')} />
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
                <ImportRouteDialog
                    show={this.props.importModalShown}
                    import={this.props.import}
                    cancel={this.props.hideImportModal} />
            </header>
        );
    }
}
