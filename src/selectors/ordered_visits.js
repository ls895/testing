import { createSelector, defaultMemoize, createSelectorCreator } from 'reselect';
import { isEqual } from 'lodash';

const createDeepEqualSelector = createSelectorCreator(
    defaultMemoize,
    isEqual
);

const visitsOrderSelector = (state, props) => props.visitOrder;

const visitsSelector = state => state.data.activeTrip.visits;

const orderedVisitsSelector = createSelector(
    [visitsSelector, visitsOrderSelector],
    (visits, order) => {
        const temp = [];
        order.forEach(key => {
            if (visits[key]) {
                const obj = { ...visits[key] };
                obj.key = key;
                temp.push(obj);
            }
        });
        return temp;
    }
);

const makeOrderVisits = () => {
    return createDeepEqualSelector(
        [orderedVisitsSelector],
        orderedVisits => {
            return orderedVisits
        }
    );
};

export default makeOrderVisits;
