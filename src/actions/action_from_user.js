import { tripsRef, visitsRef, NEW_TRIP } from '../consts';
import { database } from '../firebase';

export function newTrip() {
    return dispatch => {
        var newTripRef = visitsRef.push();
        var newTripKey = newTripRef.key;
        var newDayKey = tripsRef.child(newTripKey).child('days').push().key;
        var updates = {};
        updates['/trips/' + newTripKey] = {
            days: {
            },
            title: 'UK',
            travellers: {
                '1ZSEuHGCCEYrc1xVbu9ZeSh6mhn2': true
            }
        };
        updates['/trips/' + newTripKey].days[newDayKey] = 'SomedateString';
        updates['/users/1ZSEuHGCCEYrc1xVbu9ZeSh6mhn2/trips/' + newTripKey] = true;
        return database.ref().update(updates).then(function() {
            // callOffTripListeners();
            dispatch({
                type: NEW_TRIP,
                payload: newTripKey
            });
            // dispatch(fetchTripDetail(newTripKey));
        });
    };
}
//
// function newDay(tripid) {
//     return dispatch => {
//         tripsRef.child(tripid).child('days').push('SomedayStamp');
//     }
// };
//
// function newVisit(tripid, dayid = null, placeid) {
//     return dispatch => {
//         placesRef.child(placeid).set({
//             name: 'somePlace',
//             position: 'somePosition'
//         }).then(function() {
//             visitsRef.child(tripid).push({
//                 day: dayid,
//                 place: placeid,
//                 time: 'timestamp'
//             })
//         }).catch(function() {
//             visitsRef.child(tripid).push({
//                 day: dayid,
//                 place: placeid,
//                 time: 'timestamp'
//             })
//         });
//     }
// };
//
// function removeVisit(tripid, dayid, visitid) {
//
// }
//
// function reorderVisit() {
//
// }
//
// function removeDay(tripid, dayid) {
//
// }
//
// function reorderDay() {
//
// }
//
// function removeTrip(tripid) {
//
// }
