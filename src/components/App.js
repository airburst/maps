import React, { Component } from 'react';
import Routes from '../routes';
import Header from './Header';
import { LoginDialog, SaveDialog } from './Dialogs';
import './App.css';

export default class App extends Component {

	showLoginModal = () => this.props.showModal('login');
	hideLoginModal = () => this.props.hideModal('login');
	showImportModal = () => this.props.showModal('import');
	hideImportModal = () => this.props.hideModal('import');
	showSaveModal = () => this.props.showModal('save');
	hideSaveModal = () => this.props.hideModal('save');
	handleSave = () => {
		if (this.props.route.id) { 
			this.props.saveRoute(); 
		} else {
			this.showSaveModal();
		}
	}

	render() {
		const { showDialogs } = this.props.settings;
		const hasTrack = this.props.route.track.length > 0;
		return (
			<div role="main" id="main">
				<Header
					user={this.props.user}
					login={this.showLoginModal}
					logout={this.props.logout}
					hasTrack={hasTrack}
					followsRoads={this.props.route.followsRoads}
					toggleFollowsRoads={this.props.toggleFollowsRoads}
					removePoint={this.props.removePoint}
					clearRoute={this.props.clearRoute}
					export={this.props.exportRoute}
					import={this.props.importRoute}
					save={this.handleSave}
					importModalShown={showDialogs.import}
					showImportModal={this.showImportModal}
					hideImportModal={this.hideImportModal} />

				<Routes />

				<LoginDialog
                    show={showDialogs.login}
                    cancel={this.hideLoginModal}
					loginAction={this.props.login} />
				<SaveDialog
                    show={showDialogs.save}
					save={this.props.saveRoute}
					setRouteName={this.props.setRouteName}
                    cancel={this.hideSaveModal} />
			</div>
		);

	}
}
