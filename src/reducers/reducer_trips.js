import { FETCH_TRIPS, NEW_TRIP } from '../consts';

const INITIAL_STATE = null;

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_TRIPS:
            return action.payload;
        case NEW_TRIP:
            var obj = { ...state };
            obj[action.payload] = true;
            return obj;
        default:
            return state;
    }
}
