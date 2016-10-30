import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrderedDaysSelector from '../selectors/ordered_days';
import Day from './day';
import { newDay } from '../actions/action_from_user';

import {compose} from 'redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Planner extends Component {
    // handleNewDay() {
    //     this.props.newDay('trip1');
    // }

    render() {
        console.log('planner rendered');
        return (
            <div>
                {/* <button onClick={this.handleNewDay.bind(this)}>New Day</button> */}
                {
                    this.props.orderedDays.map(day => {
                        return <Day
                            key={day.key}
                            id={day.key}
                            visitOrder={day.visitOrder}
                            date={day.date}
                        />;
                    })
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log('mapstatetoprops run for: planner');
    return {
        orderedDays: OrderedDaysSelector(state)
    };
}

export default compose(
    DragDropContext(HTML5Backend),
    connect(mapStateToProps, { newDay })
)(Planner);
