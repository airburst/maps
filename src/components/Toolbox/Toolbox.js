import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { List } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import SearchIcon from 'material-ui/svg-icons/action/search';
import DownloadIcon from 'material-ui/svg-icons/file/file-download';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';
import SaveIcon from 'material-ui/svg-icons/content/save';
import UndoIcon from 'material-ui/svg-icons/content/undo';
import BikeIcon from 'material-ui/svg-icons/maps/directions-bike';
import WalkIcon from 'material-ui/svg-icons/maps/directions-walk';
import MapIcon from 'material-ui/svg-icons/maps/map';
import RoutesIcon from 'material-ui/svg-icons/action/bookmark-border';
import { white, blueGrey800 } from 'material-ui/styles/colors';
import { goToPlanner, goToRouteList } from '../../routes';

const styles = {
    toolbox: {
        position: 'absolute',
        top: 64,
        left: 0,
        width: 48,
        height: '100%',
        backgroundColor: white,
        zIndex: 2000,
        color: blueGrey800,
    },
    paper: {
        height: '100%'
    },
    tooltip: {
        color: white,
        fontSize: '16px'
    }
}

export default class Toolbox extends Component {

    render() {
        const hasTrack = this.props.route.track.length > 0;
        const { editable, followsRoads } = this.props.route;

        return (
            <div id="toolbox" style={styles.toolbox}>
                <Paper style={styles.paper}>
                    <List>
                        <IconButton>
                            <SearchIcon onClick={this.props.showSearchPanel} />
                        </IconButton>
                        <IconButton>
                            <ClearIcon onClick={this.props.clearRoute} />
                        </IconButton>
                        {editable && (
                            <IconButton>
                                <UndoIcon onClick={this.props.removePoint} />
                            </IconButton>
                        )}
                        {editable && (
                            followsRoads ?
                            <IconButton>
                                <BikeIcon onClick={this.props.toggleFollowsRoads} />
                            </IconButton> :
                            <IconButton>
                                <WalkIcon onClick={this.props.toggleFollowsRoads} />
                            </IconButton>
                        )}
                    </List>
                    <Divider />
                    <List>
                        <IconButton>
                            <UploadIcon onClick={this.props.showImportModal} />
                        </IconButton>
                        {hasTrack && (
                            <IconButton>
                                <DownloadIcon onClick={this.props.export} />
                            </IconButton>
                        )}
                        {hasTrack && (
                            <IconButton>
                                <SaveIcon onClick={this.props.showSaveModal} />
                            </IconButton>
                        )}
                    </List>
                    <Divider />
                    <List>
                        <IconButton>
                            <MapIcon onClick={goToPlanner} />
                        </IconButton>
                        <IconButton>
                            <RoutesIcon onClick={goToRouteList} />
                        </IconButton>
                    </List>
                </Paper>
            </div>
        );

    }
}
