import { createSelector } from 'reselect';

const visitSelector = (state, props) => state.data.activeTrip.visits[props.id];

const placeSelector = (state, props) => state.data.activeTrip.places[]
