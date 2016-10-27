import { usersRef, FETCH_TRIPS } from '../consts';

export function fetchTrips(uid) {
    return dispatch => {
        var userTripRef = usersRef.child(uid).child('trips');
        userTripRef.once('value').then(function(snap) {
            dispatch({
                type: FETCH_TRIPS,
                payload: snap.val()
            });
            // for each trip grab trip title, trip picture, trip member
        });
    };
}
