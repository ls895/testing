import firebase from 'firebase';

function listenToAuth() {
    return dispatch => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                dispatch({
                    type: 'LOGGED_IN',
                    data: user
                });
                // dispatch(fetchTripsOfUser(user));
            } else {
            // No user is signed in.
            }
        });
    };
}

export default listenToAuth;
