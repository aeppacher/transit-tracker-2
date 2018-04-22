import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Station from './station';

import { getStopData, addFavorite, getArrivals } from '../redux/transit_actions';

const mapDispatchToProps = (dispatch) => bindActionCreators({
	getStopData,
	getArrivals,
	addFavorite
}, dispatch);

const mapStateToProps = (state) => {
	return {
		currentStop: state.stops.currentStop,
		currentUser: state.user.currentUser,
		currentArrivals: state.stops.currentArrivals
	}
}

const StationContainer = connect(mapStateToProps, mapDispatchToProps)(Station);
export default StationContainer;