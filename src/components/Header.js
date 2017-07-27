import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import DownloadIcon from 'material-ui/svg-icons/file/file-download';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';
import SaveIcon from 'material-ui/svg-icons/content/save';
import UndoIcon from 'material-ui/svg-icons/content/undo';
import BikeIcon from 'material-ui/svg-icons/maps/directions-bike';
import WalkIcon from 'material-ui/svg-icons/maps/directions-walk';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { white } from 'material-ui/styles/colors';
import SearchContainer from '../containers/SearchContainer';

const handleClick = (text, e) => {
    alert('Need to handle ' + text);
}

export default class Header extends Component {

    render() {
        return (
            <header className="header">
                <Toolbar>
                    <ToolbarGroup>
                        <SearchContainer />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        {
                            this.props.followsRoads ?
                                <IconButton>
                                    <BikeIcon
                                        onClick={this.props.toggleFollowsRoads}
                                        color={white} />
                                </IconButton> :
                                <IconButton>
                                    <WalkIcon
                                        onClick={this.props.toggleFollowsRoads}
                                        color={white} />
                                </IconButton>
                        }
                        {
                            this.props.hasTrack ? (
                                <div>
                                    <IconButton>
                                        <CloseIcon
                                            onClick={this.props.clearRoute}
                                            color={white} />
                                    </IconButton>
                                    <IconButton>
                                        <UndoIcon
                                            onClick={this.props.removePoint}
                                            color={white} />
                                    </IconButton>
                                    <IconButton>
                                        <SaveIcon
                                            onClick={handleClick.bind(this, 'save')}
                                            color={white} />
                                    </IconButton>
                                    <IconButton>
                                        <DownloadIcon
                                            onClick={handleClick.bind(this, 'download')}
                                            color={white} />
                                    </IconButton>
                                </div>
                            ) : <div />
                        }

                        <IconButton>
                            <UploadIcon
                                onClick={handleClick.bind(this, 'upload')}
                                color={white} />
                        </IconButton>
                    </ToolbarGroup>
                </Toolbar>
            </header>
        );
    }
}
