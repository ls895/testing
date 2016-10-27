import { TRIP_TITLE, DAY_CHANGED, DAY_ADDED, DAY_REMOVED,
    TRAVELLER_ADDED, TRAVELLER_REMOVED,
    VISIT_ADDED, VISIT_REMOVED, VISIT_CHANGED, PLACE_DETAIL
} from '../consts';
import _ from 'lodash';

const INITIAL_STATE = {
    title: null,
    days: {},
    travellers: {},
    visits: {},
    places: {}
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case TRIP_TITLE:
            return {
                ...state,
                title: action.payload
            };
        case DAY_CHANGED:
        case DAY_ADDED:
        case DAY_REMOVED:
            return {
                ...state,
                days: daysReducer(state.days, action)
            };
        case TRAVELLER_ADDED:
        case TRAVELLER_REMOVED:
            return {
                ...state,
                travellers: travellersReducer(state.travellers, action)
            };
        case VISIT_ADDED:
        case VISIT_REMOVED:
        case VISIT_CHANGED:
            return {
                ...state,
                visits: visitsReducer(state.visits, action)
            };
        case PLACE_DETAIL:
            return {
                ...state,
                places: placesReducer(state.places, action)
            };
        default:
            return state;
    }
}

function daysReducer(state, action) {
    switch (action.type) {
        case DAY_CHANGED:
        case DAY_ADDED:
            var obj = { ...state };
            obj[action.payload.key] = action.payload.date;
            return obj;
        case DAY_REMOVED:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}

function travellersReducer(state, action) {
    switch (action.type) {
        case TRAVELLER_ADDED:
            var obj = { ...state };
            obj[action.payload] = true;
            return obj;
        case TRAVELLER_REMOVED:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}

function visitsReducer(state, action) {
    switch (action.type) {
        case VISIT_ADDED:
            var obj = { ...state };
            obj[action.payload.key] = action.payload.detail;
            return obj;
        case VISIT_REMOVED:
            return _.omit(state, action.payload);
        case VISIT_CHANGED:
            var obj2 = { ...state };
            obj2[action.payload.visit] = { ...obj2[action.payload.visit] };
            obj2[action.payload.visit][action.payload.key] = action.payload.value;
            return obj2;
        default:
            return state;
    }
}

function placesReducer(state, action) {
    switch (action.type) {
        case PLACE_DETAIL:
            var obj = { ...state };
            obj[action.payload.key] = action.payload.detail;
            return obj;
        default:
            return state;
    }
}