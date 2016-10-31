import React, { Component } from 'react';
import { connect } from 'react-redux';
import makeOrderVisits from '../selectors/ordered_visits';
import { newVisit, reorderVisit } from '../actions/action_from_user';
import { emptyArray } from '../consts';
import Visit from './visit2';

class Day extends Component {
    handleNewVisit() {
        this.props.newVisit(this.props.id, 'p10');
    }

    moveItem(sourceId, fromDay, targetId) {
        var visitOrder = [...this.props.visitOrder];
        var targetIndex = visitOrder.indexOf(targetId);
        if (fromDay === this.props.id) {
            var sourceIndex = visitOrder.indexOf(sourceId);
            visitOrder.splice(sourceIndex, 1);
            visitOrder.splice(targetIndex, 0, sourceId);
            this.props.reorderVisit(this.props.id, visitOrder);
        } else {
            // var targetIndex = visitOrder.indexOf(targetId);
            // visitOrder.splice(targetIndex, 0, sourceId);
            // this.props.reorderVisit(this.props.id, visitOrder);
        }
    }

    // removeVisit(visitId) {
    //     var visitOrder = [...this.props.visitOrder];
    //     var toRemoveIndex = visitOrder.indexOf(visitId);
    //     visitOrder.splice(toRemoveIndex, 1);
    //     this.props.reorderVisit(this.props.id, visitOrder);
    //     // console.log(visitOrder);
    // }

    render() {
        console.log('day rendered: ' + this.props.id + ' ' + this.props.detail)
        return (
            <div className="day">
                <h3>{this.props.detail}</h3>
                <button onClick={this.handleNewVisit.bind(this)}>New Visit</button>
                <div>
                    {
                        this.props.visitOrder.map((key, i) => {
                            return (
                                <Visit
                                    key={key}
                                    id={key}
                                    day={this.props.id}
                                    index={i}
                                    moveItem={this.moveItem.bind(this)}
                                />
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    if (state.data.activeTrip.days[props.id]) {
        return {
            detail: state.data.activeTrip.days[props.id].date,
            visitOrder: state.data.activeTrip.days[props.id].visitOrder
        };
    } else {
        return {
            detail: 'loading',
            visitOrder: emptyArray
        };
    }
}

export default connect(mapStateToProps, { newVisit, reorderVisit })(Day);
