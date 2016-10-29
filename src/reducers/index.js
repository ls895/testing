import { combineReducers } from 'redux';
import tripsReducer from './reducer_trips';
import activeTripReducer from './reducer_active_trip';

const rootReducer = combineReducers({
    data: combineReducers({
        trips: tripsReducer,
        activeTrip: activeTripReducer
    })
});

export default rootReducer;

// {
//     traffic: {
//         day1: {
//             slot1: {
//
//             },
//             slot2: {
//
//             }
//         },
//         day2: {
//             slot1: {
//
//             },
//             slot2: {
//
//             }
//         }
//     }
// }
