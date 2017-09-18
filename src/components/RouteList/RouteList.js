import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { red500 } from 'material-ui/styles/colors';
import ConfirmDeleteDialog from '../Dialogs/ConfirmDeleteDialog';
import MapPlaceholder from '../../images/map-placeholder.png';
import '../App.css';

const styles = {
	red: {
		color: red500,
	}
}

export default class RouteList extends Component {

	state = {
		routes: {},
		showConfirm: false,
		selectedRoute: null
	};

	showConfirm = (selectedRoute) => {
		this.setState({
			showConfirm: true,
			selectedRoute
		})
	}

	hideConfirm = () => {
		this.setState({
			showConfirm: false,
			selectedRoute: null
		})
	}

	handleDelete = () => {
		this.deleteRoute(this.state.selectedRoute);
		this.hideConfirm();
	}

	showRoute = (id) => {
		this.props.getRoute(id)
			.then(() => false)
			.catch(err => console.log('Error getting route', err));
	}

	deleteRoute = (id) => {
		this.props.deleteRoute(id)
			.then(() => {
				let newRoutes = Object.assign({}, this.state.routes);
				delete newRoutes[id];
				this.setState({ routes: newRoutes });
			})
			.catch(err => console.log('Error deleting route', err));
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.user.uid !== this.props.user.uid ||
			Object.keys(nextState.routes).length !== Object.keys(this.state.routes).length ||
			nextState.showConfirm !== this.state.showConfirm
		);
	}

	componentWillMount() {
		// Refresh component after redirect
		if (this.props.history.action === 'PUSH') {
			this.forceUpdate();
		}
	}

	componentDidUpdate() {
		const { uid } = this.props.user;
		if (uid && Object.keys(this.state.routes).length === 0) {
			this.props.getRouteList()
				.then(routes => this.setState({ routes }))
				.catch(err => console.log('Error getting routes list'));
		}
	}

	render() {
		const { routes, showConfirm } = this.state;
		const routeList = Object.entries(routes);
		const Routes = routeList.map(r => {
			const [key, route] = r;
			const { name } = route;
			return (
				<div className="route-item" key={key}>
					<Card>
						<CardTitle
							title={name} />
						<CardMedia>
							<img
								src={MapPlaceholder}
								alt={'Map of ' + name} />
						</CardMedia>
						<CardActions>
							<FlatButton
								label="View"
								onClick={() => this.showRoute(key)} />
							<FlatButton
								label="Delete"
								style={styles.red}
								onClick={() => this.showConfirm(key)} />
						</CardActions>
					</Card>
				</div>
			)
		});

		return (
			<div>
				<div className="content">
					<div className="content-wrapper">
						<h2 className="title">Saved Routes</h2>
						<div className="grid">
							{Routes}
						</div>
					</div>
				</div>
				<ConfirmDeleteDialog
					show={showConfirm}
					remove={this.handleDelete}
					cancel={this.hideConfirm} />
			</div>
		);
	}
}
