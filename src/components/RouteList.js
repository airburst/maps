import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { red500 } from 'material-ui/styles/colors';
import './App.css';
import MapPlaceholder from '../images/map-placeholder.png';

const styles = {
	red: {
		color: red500,
	}
}

export default class RouteList extends Component {

	constructor() {
		super();
		this.state = {
			routes: {}
		};
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
			Object.keys(nextState.routes).length !== Object.keys(this.state.routes).length
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
		const routeList = Object.entries(this.state.routes);
		const Routes = routeList.map(r=> {
			const [key, route] = r;
			return (
				<div className="route-item" key={key}>
					<Card>
						<CardTitle
							title={route.name}
							subtitle={route.date} />
						<CardMedia>
							<img 
								src={MapPlaceholder} 
								alt={'Map of ' + route.name} />
						</CardMedia>
						<CardActions>
							<FlatButton 
								label="View" 
								onClick={() => this.showRoute(key)}/>
							<FlatButton 
								label="Delete"
								style={styles.red}
								onClick={() => this.deleteRoute(key)}/>
						</CardActions>
					</Card>
				</div>
			)
		});

		return (
			<div className="content">
				<div className="content-wrapper">
					<h2 className="title">Saved Routes</h2>
					<div className="grid">
						{Routes}
					</div>
				</div>
			</div>
		);
	}
}
