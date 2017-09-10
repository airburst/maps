import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
// import { LoginDialog, SaveDialog } from './Dialogs';
import './App.css';

export default class RouteList extends Component {

	constructor() {
		super();
		this.state = {
			routes: {}
		};
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
		const routeList = Object.values(this.state.routes);
		const Routes = routeList.map((route, key) => {
			return (
				<div className="route-item" key={key}>
					<Card>
						<CardTitle
							title={route.name}
							subtitle={route.date} />
						<CardMedia>
							<img src="http://via.placeholder.com/300x200" alt="Screenshot" />
						</CardMedia>
						<CardActions>
							<FlatButton label="View Route" />
						</CardActions>
					</Card>
				</div>
			)
		});

		return (
			<div className="content">
				<div className="content-wrapper">
					<h2>Saved Routes</h2>
					<div className="grid">
						{Routes}
					</div>
				</div>
			</div>
		);
	}
}
