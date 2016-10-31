import { tripsRef, visitsRef, placesRef, NEW_TRIP } from '../consts';
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
            },
            dayOrder: [newDayKey]
        };
        updates['/trips/' + newTripKey].days[newDayKey] = {
            date: 'somedatestring',
            visitOrder: ['placeholder']
        };
        updates['/users/1ZSEuHGCCEYrc1xVbu9ZeSh6mhn2/trips/' + newTripKey] = true;
        updates['/visits/' + newTripKey] = {};
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

export function newDay(tripid) {
    return () => {
        tripsRef.child(tripid).child('days').push({
            date: 'somedatestring',
            visitOrder: ['placeholder']
        });
    };
}

export function removeDay() {

}

export function reorderDay() {

}

export function newVisit(dayid, placeid) {
    return (dispatch, getState) => {
        var tripid = getState().data.activeTrip.tripid;
        placesRef.child(placeid).set({
            name: 'somePlace',
            position: 'somePosition'
        }).then(() => {
            var newVisitRef = visitsRef.child(tripid).push();
            var newVisitKey = newVisitRef.key;
            return newVisitRef.set({
                placeid: placeid,
                arriveTime: 'timestamp',
                departTime: 'timestamp'
            }).then(() => {return Promise.resolve(newVisitKey);});
        }).then(newVisitKey => {
            tripsRef.child(tripid).child('days').child(dayid).child('visitOrder').transaction(current => {
                if (current[0] === 'placeholder') {
                    return [newVisitKey];
                } else {
                    return [...current].concat([newVisitKey]);
                }
            });
        });
    };
}

export function removeVisit() {

}

export function reorderVisit(dayid, newOrder) {
    return (dispatch, getState) => {
        var tripid = getState().data.activeTrip.tripid;
        tripsRef.child(tripid).child('days').child(dayid).child('visitOrder').transaction(function() {
            return newOrder;
        });
    };
}

export function dragVisitAcrossDay(tripid, old_day, old_day_order, new_day, new_day_order) {
    return () => {
    };
}
