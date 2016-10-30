import { RESET, TRIP_ID, TRIP_TITLE, DAY_ORDER, DAY_DETAIL_CHANGED, DAY_ADDED, DAY_REMOVED,
    TRAVELLER_ADDED, TRAVELLER_REMOVED,
    VISIT_ADDED, VISIT_REMOVED, VISIT_CHANGED, PLACE_DETAIL
} from '../consts';
import _ from 'lodash';

const INITIAL_STATE = {
    tripid: null,
    title: null,
    days: {},
    dayOrder: [],
    travellers: {},
    visits: {},
    places: {}
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case TRIP_ID:
            return {
                ...state,
                tripid: action.payload
            };
        case TRIP_TITLE:
            return {
                ...state,
                title: action.payload
            };
        case DAY_ORDER:
            return {
                ...state,
                dayOrder: action.payload
            };
        case DAY_DETAIL_CHANGED:
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
        case RESET:
            return { ...INITIAL_STATE };
        default:
            return state;
    }
}

function daysReducer(state, action) {
    switch (action.type) {
        case DAY_DETAIL_CHANGED:
            var obj = { ...state };
            obj[action.payload.day] = { ...obj[action.payload.day] };
            obj[action.payload.day][action.payload.key] = action.payload.data;
            return obj;
        case DAY_ADDED:
            var obj2 = { ...state };
            obj2[action.payload.key] = action.payload.date;
            return obj2;
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
            console.log('visit added: ' + action.payload.key)
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
