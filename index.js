const initialState = {
    listeners: {
        dayplans: {

        },
        trips: {

        },
        users: {

        },
        visits: {

        }
    },
    auth: {
        username: null
    },
    entities: {
    }
};



const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

store.dispatch(fetchTripsOfUser('1ZSEuHGCCEYrc1xVbu9ZeSh6mhn2'))
// var newTripKey = database.ref().child('trips').push().key;

// var updates = {};

// updates['/users/user1'] = {
//     trips: {
//         trip1: true,
//         trip3: true
//     }
// }

// updates['/trips/' + newTripKey] = {
//     title: 'trial',
//     traveller: {
//         user1: true
//     }
// }

// updates['/users/user1/trips'] = {
//     newTripKey: true
// }

// database.ref().update(updates);
// console.log(newTripKey);
// user1Ref.set({
//     trips: {
//         trip1: true,
//         trip3: true
//     }
// });

// module.exports = database;
