import React from 'react';
import { Button, Card, CardBody, CardTitle, CardText, Nav, Navbar, NavbarBrand, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import StopCard from './stop_card';

import CustomNav from './custom_nav';

class Route extends React.Component {
	constructor(props) {
		super(props);

		this.toggleStops = this.toggleStops.bind(this);

		this.state = 
		{
			stopsCollapsed: true,
		}
	}

	toggleStops() {
		this.setState({stopsCollapsed: !this.state.stopsCollapsed});
	}

	componentDidMount(){
		this.getData();
	}

	getData(){
		this.props.getRouteData(this.props.match.params.route_id);
		this.props.getCurrentRouteStops(this.props.match.params.route_id);
	}

	render(){
		console.log(this.props, "render props");

		let dropdownStyle = 
		{
			marginTop: "10px",
			borderRadius: "0.25em"
		}

		const minusImageUrl = "https://i.imgur.com/6HeCKEF.png";
		const plusImageUrl = "https://i.imgur.com/P8twezm.png";

		let unsortedStops = this.props.currentRouteStops === undefined ? [] : this.props.currentRouteStops;
		let stop_cards = _.map(unsortedStops, (ss) => <StopCard key={ss.id} stop={ss} />);
		return (
			<div>
				<CustomNav />
				<Card >
					<CardBody>
		        <CardTitle >
		       		{"Route - " + this.props.currentRoute.name}
		        </CardTitle>
		        <CardTitle>
		        	{"Directions - " + this.props.currentRoute.dir_0 + " + " + this.props.currentRoute.dir_1}
		       	</CardTitle>
				  </CardBody>
			  </Card>
			  <Navbar style={dropdownStyle} color="light" light expand="md">
					Stations
					<Nav className="ml-auto" navbar>
						<Button color="link" onClick={this.toggleStops}>
							<img src={this.state.stopsCollapsed == true ? minusImageUrl : plusImageUrl}/>
						</Button>
					</Nav>
				</Navbar>
				<Collapse isOpen={this.state.stopsCollapsed}>
          {stop_cards}
        </Collapse>
			</div>
		);
	}
}

export default Route;