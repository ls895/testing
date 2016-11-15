/* global listeners */

import { tripsRef,
    visitsRef,
    placesRef,
    RESET, TRIP_ID, TRIP_TITLE,
    DAY_ADDED, DAY_REMOVED, DAY_ORDER, DAY_DETAIL_CHANGED,
    TRAVELLER_ADDED, TRAVELLER_REMOVED,
    VISIT_ADDED, VISIT_REMOVED, VISIT_CHANGED, PLACE_DETAIL
} from '../consts';

export function fetchTripDetail(tripid) {
    return dispatch => {
        dispatch({
            type: RESET
        });
        dispatch({
            type: TRIP_ID,
            payload: tripid
        });
        // first immediately dispatch UI state blablabla
        // then do the following
        tripsRef.child(tripid).child('title').once('value').then(function(snap) {
            dispatch({
                type: TRIP_TITLE,
                payload: snap.val()
            });
        });
        tripsRef.child(tripid).child('dayOrder').on('value', function(snap) {
            dispatch({
                type: DAY_ORDER,
                payload: snap.val()
            });
        });
        tripsRef.child(tripid).child('days').orderByValue().on('child_added', function(snap) {
            var key = snap.key;
            dispatch({
                type: DAY_ADDED,
                payload: {
                    key: snap.key,
                    date: snap.val()
                }
            });
            tripsRef.child(tripid).child('days').child(key).on('child_changed', function(snap) {
                dispatch({
                    type: DAY_DETAIL_CHANGED,
                    payload: {
                        day: key,
                        key: snap.key,
                        data: snap.val()
                    }
                });
            });
        });
        tripsRef.child(tripid).child('days').on('child_removed', function(snap) {
            dispatch({
                type: DAY_REMOVED,
                payload: snap.key
            });
        });
        //
        // listeners.tripDays = tripsRef.child(tripid).child('days');
        tripsRef.child(tripid).child('travellers').on('child_added', function(snap) {
            dispatch({
                type: TRAVELLER_ADDED,
                payload: snap.key
            });
        });
        tripsRef.child(tripid).child('travellers').on('child_removed', function(snap) {
            dispatch({
                type: TRAVELLER_REMOVED,
                payload: snap.key
            });
        });
        //
        // listeners.tripTravellers = tripsRef.child(tripid).child('travellers');
        //
        visitsRef.child(tripid).on('child_added', function(snap) {
            var key = snap.key;
            dispatch({
                type: VISIT_ADDED,
                payload: {
                    detail: snap.val(),
                    key: snap.key
                }
            });
            placesRef.child(snap.val().placeid).once('value').then(function(snap) {
                dispatch({
                    type: PLACE_DETAIL,
                    payload: {
                        key: snap.key,
                        detail: snap.val()
                    }
                });
            });
            visitsRef.child(tripid).child(key).on('child_changed', function(snap) {
                alert('child_changed')
                console.log(snap.val())
                dispatch({
                    type: VISIT_CHANGED,
                    payload: {
                        visit: key,
                        key: snap.key,
                        value: snap.val()
                    }
                });
            });
        });
        visitsRef.child(tripid).on('child_removed', function(snap) {
            dispatch({
                type: VISIT_REMOVED,
                payload: snap.key
            });
        });
        //
        // listeners.tripVisits = visitsRef.child(tripid);
    // }
};
}
