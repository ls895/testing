// Also start building Redux state shape


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'NEW_TRIP':
            console.log(action.data);
            break;
        case 'REMOVE_TRIP':
            console.log(action.data);
            break;
        case 'TRIP_TITLE':
            console.log(action.data);
            break;
        case 'DAY_ADDED':
            console.log(action.data);
            break;            
        case 'DAY_REMOVED':
            console.log(action.data);
            break;            
        case 'TRAVELLER_ADDED':
            console.log(action.data);
            break;            
        case 'TRAVELLER_REMOVED':
            console.log(action.data);
            break;
        case 'VISIT_ADDED':
            console.log(action.data);
            break;
        case 'VISIT_REMOVED':
            console.log(action.data);
            break;
        case 'VISIT_CHANGED':
            console.log(action.data);
            break;
        case 'PLACE_DETAIL':
            console.log(action.data);
            break;
    }
    return state;
};