import React from 'react';
import { Button, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import CustomNav from './custom_nav';

class Station extends React.Component {


	constructor(props) {
		super(props);

		this.addFavorite = this.addFavorite.bind(this);
		this.updateData = this.updateData.bind(this);
		this.removeFavorite = this.removeFavorite.bind(this);
		let user_id = window.user;

		if(this.props.currentUser !== undefined){
			this.state = { loggedIn: true};
		}
		else {
			this.state = { loggedIn: false};
		}
	}

	componentDidMount(){
		this.getData();
	}

	getData(){
		this.props.getStopData(this.props.match.params.stop_id);
		this.props.getArrivals(this.props.match.params.stop_id);
		setInterval(this.updateData, 60000);
	}

	updateData(){
		console.log(this, "updated");
		this.props.getArrivals(this.props.match.params.stop_id);
	}

	addFavorite(){
		let favorites = this.props.currentUser.favorites;
		favorites.push(this.props.currentStop.stop_id);

		this.props.addFavorite(favorites, this.props.currentUser.id);
		location.reload();
	}

	removeFavorite(){
		let favorites = this.props.currentUser.favorites;
		var index = favorites.indexOf(this.props.currentStop.stop_id);
		if (index > -1) {
		  favorites.splice(index, 1);
		}
		this.props.addFavorite(favorites, this.props.currentUser.id);
		location.reload();
	}

	render(){
		let routes = this.props.currentStop.routes;
		let arrivals = this.props.currentArrivals;

		let arrivalCards = _.map(arrivals, (aa, index) =>
			<CardBody key={index}>
				<CardText>Vehicle #{aa.id} <br/> Direction: {aa.direction == 0 ? "Inbound" : "outbound"} <br/> Arrival Time: {aa.arrival_time.substring(11, 16)}</CardText>
			</CardBody>
		);

		let routeCards = _.map(routes, (rr, index) => 
    <CardText key={index}>
    	<NavLink to={"/route/" + rr}>{rr}</NavLink>
    </CardText>);

		let favoritesButton = <Button color="link" onClick={this.addFavorite}>
			Add to favorites
		</Button>;
		let unfavoriteButton = <Button color="link" onClick={this.removeFavorite}>
			Remove from favorites
		</Button>;
		let favorites = null;

		if(this.props.currentUser !== null){
			console.log(this.props, "logged in props");
			let currentFavorites = this.props.currentUser.favorites !== null
			if(this.props.currentUser.favorites.indexOf(this.props.currentStop.stop_id) == -1){
				favorites = favoritesButton;
			}
			else{
				favorites = unfavoriteButton;
			}
		}

		let d = new Date();
		let hour = d.getHours();
		let minutes = (d.getMinutes()<10?'0':'') + d.getMinutes();

		console.log(this.props, "render props");
		return (
			<div>
				<CustomNav />
				<Card >
					<CardBody>
		        <CardTitle >
		       		{"Station - " + this.props.currentStop.name}
		       		{favorites}
		        </CardTitle>
			    	<CardTitle >
		       		Routes
		        </CardTitle>
				    <CardBody>
			        {routeCards}
				    </CardBody>
			    	<CardTitle >
		       		Next arrival
		       		<CardText>
					    	{arrivalCards.length === 0 ? "No arrivals returning from api" : arrivalCards }
					    </CardText>
		        </CardTitle>
		        <CardText>
					    This page auto updates every minute, no need to refresh last updated at {hour + ":" + minutes}
					    <br/>
				    	*Few arrivals may be the result of api outtages where arrival times are being displayed as null (which we are filtering out), the MBTA api has had outtages the past week and a half
					  </CardText>
				   </CardBody>
			  </Card>
			</div>
		);
	}
}

export default Station;