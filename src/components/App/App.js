import React, { Component } from 'react';
import Routes from '../../routes';
import Header from '../Header';
import Toolbox from '../Toolbox';
import ElevationProfile from '../ElevationProfile';
import { LoginDialog, SaveDialog, ImportRouteDialog } from '../Dialogs';
import '../App.css';

export default class App extends Component {

	showSearchPanel = () => {
		console.log('Show the search panel')
	}

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

		return (
			<div role="main" id="main">
				<Header
					user={this.props.user}
					login={this.showLoginModal}
					logout={this.props.logout}
					clearRoute={this.props.clearRoute} />
				<Toolbox
					export={this.props.exportRoute}
					showSearchPanel={this.showSearchPanel}
					showImportModal={this.showImportModal}
					showSaveModal={this.showSaveModal} />

				<div className="main-content">
					<Routes />
				</div>

				<ElevationProfile />

				<LoginDialog
					show={showDialogs.login}
					cancel={this.hideLoginModal}
					loginAction={this.props.login} />
				<SaveDialog
					show={showDialogs.save}
					save={this.props.saveRoute}
					setRouteName={this.props.setRouteName}
					cancel={this.hideSaveModal} />
				<ImportRouteDialog
					show={showDialogs.import}
					import={this.props.importRoute}
					cancel={this.hideImportModal} />
			</div>
		);

	}
}
