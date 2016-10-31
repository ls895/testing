import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emptyArray } from '../consts';
import Day from './day2';

import {compose} from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Planner extends Component {
    // handleNewDay() {
    //     this.props.newDay('trip1');
    // }
    moveItem(sourceId, targetId, dayId) {
        console.log('moving from', sourceId, 'to', targetId, 'on day', dayId)
	}

    render() {
        console.log('planner rendered');
        return (
            <div className="planner">
                {
                    this.props.dayOrder.map((key, i) => {
                        return <Day
                            key={key}
                            id={key}
                            index={i}
                            moveItem={this.moveItem}
                        />;
                    })
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    if (!state.data.activeTrip.dayOrder) {
        return {
            dayOrder: emptyArray
        };
    }
    return {
        dayOrder: state.data.activeTrip.dayOrder
    };
}
//
export default compose(
    DragDropContext(HTML5Backend),
    connect(mapStateToProps)
)(Planner);
// export default connect(mapStateToProps)(Planner);
