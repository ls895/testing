



function fetchTripMeta(tripid) {
    return dispatch => {

    }
}

var listeners = {};

function callOffTripListeners() {
    for (var loc in listeners) {
        listeners[loc].off();
    }
}

function fetchTripDetail(tripid) {
    return dispatch => {
        // first immediately dispatch UI state blablabla
        // then do the following
        tripsRef.child(tripid).child('title').once('value').then(function(snap) {
            dispatch({
                type: 'TRIP_TITLE',
                data: snap.val()
            });
        });
        tripsRef.child(tripid).child('days').orderByValue().on('child_added', function(snap) {
            dispatch({
                type: 'DAY_ADDED',
                data: {
                    key: snap.key,
                    date: snap.val()
                }
            });
        });
        tripsRef.child(tripid).child('days').on('child_removed', function(snap) {
            dispatch({
                type: 'DAY_REMOVED',
                data: snap.key
            });
        });

        listeners.tripDays = tripsRef.child(tripid).child('days');

        tripsRef.child(tripid).child('travellers').on('child_added', function(snap) {
            dispatch({
                type: 'TRAVELLER_ADDED',
                data: snap.key
            });
        });
        tripsRef.child(tripid).child('travellers').on('child_removed', function(snap) {
            dispatch({
                type: 'TRAVELLER_REMOVED',
                data: snap.key
            });
        });

        listeners.tripTravellers = tripsRef.child(tripid).child('travellers');

        visitsRef.child(tripid).on('child_added', function(snap) {
            dispatch({
                type: 'VISIT_ADDED',
                data: {
                    val: snap.val(),
                    key: snap.key
                }
            })
            placesRef.child(snap.val().place).once('value').then(function(snap) {
                dispatch({
                    type: 'PLACE_DETAIL',
                    data: snap.val()
                })
            });
        })
        visitsRef.child(tripid).on('child_removed', function(snap) {
            dispatch({
                type: 'VISIT_REMOVED',
                data: snap.key
            })
        })
        visitsRef.child(tripid).on('child_changed', function(snap) {
            // Do something to check what changes happened to child
            // Will need to pull a new place if place is changed

            dispatch({
                type: 'VISIT_CHANGED',
                data: {
                    val: snap.val(),
                    key: snap.key
                }
            });
        });

        listeners.tripVisits = visitsRef.child(tripid);
    }
}
