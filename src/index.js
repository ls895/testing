import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { fetchTrips } from './actions/action_trips';
import { fetchTripDetail } from './actions/action_trip_detail';
import { newTrip } from './actions/action_from_user';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxThunk)));

store.dispatch(fetchTrips('1ZSEuHGCCEYrc1xVbu9ZeSh6mhn2'));

store.dispatch(fetchTripDetail('trip1'));
// store.dispatch(fetchTripDetail('trip2'));
window.store = store;
window.newTrip = newTrip;
