import { createSelector } from 'reselect';

const daysSelector = state => state.data.activeTrip.days;

const dayOrderSelector = state => state.data.activeTrip.dayOrder;

const orderDays = (days, dayOrder) => {
    console.log('selector for planner is run')
    if (!dayOrder) {
        return [];
    }
    const temp = [];
    dayOrder.forEach(key => {
        if (days[key]) {
            const obj = { ...days[key] };
            obj.key = key;
            temp.push(obj);
        }
    });
    return temp;
};

export default createSelector(
    daysSelector,
    dayOrderSelector,
    orderDays
);
