export default function stopReducer( state = {
	allStops: [],
	currentStop: [],
	currentRouteStops: [],
	currentArrivals: []
}, action ) {
	switch (action.type) {
		case "SET_ALL_STOPS": {
			return {
				...state,
				allStops: action.payload
			}
		}
		case "SET_STOP_DATA": {
			return {
				...state,
				currentStop: action.payload
			}
		}
		case "SET_CURRENT_ROUTE_STOPS": {
			return {
				...state,
				currentRouteStops: action.payload
			}
		}
		case "SET_ARRIVALS": {
			return {
				...state,
				currentArrivals: action.payload
			}
		}
		default: {
			return state
		}
	}
}