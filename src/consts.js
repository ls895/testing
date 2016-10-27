import { database } from './firebase';

export const rootRef = database.ref();

export const usersRef = database.ref('/users');

export const tripsRef = database.ref('/trips');

export const visitsRef = database.ref('/visits');

export const placesRef = database.ref('/places');

export const FETCH_TRIPS = 'FETCH_TRIPS';

export const NEW_TRIP = 'NEW_TRIP';

export const TRIP_TITLE = 'TRIP_TITLE';

export const DAY_CHANGED = 'DAY_CHANGED';

export const DAY_ADDED = 'DAY_ADDED';

export const DAY_REMOVED = 'DAY_REMOVED';

export const TRAVELLER_ADDED = 'TRAVELLER_ADDED';

export const TRAVELLER_REMOVED = 'TRAVELLER_REMOVED';

export const VISIT_CHANGED = 'VISIT_CHANGED';

export const VISIT_ADDED = 'VISIT_ADDED';

export const VISIT_REMOVED = 'VISIT_REMOVED';

export const PLACE_DETAIL = 'PLACE_DETAIL';
