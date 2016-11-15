import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newVisit, reorderVisit, fetchDayVisitOrders } from '../actions/action_from_user';
import { emptyArray } from '../consts';
import Visit from './visit2';


class Day extends Component {
    handleNewVisit() {
        this.props.newVisit(this.props.id, 'p10');
    }

    moveItem(sourceId, targetId) {
        this.props.fetchDayVisitOrders(sourceId).then(({sourceIndex, fromDay, originalOrder}) => {
            if (fromDay === this.props.id) {
                const visitOrder = [...originalOrder];
                const targetIndex = visitOrder.indexOf(targetId);
                visitOrder.splice(sourceIndex, 1);
                visitOrder.splice(targetIndex, 0, sourceId);
                this.props.reorderVisit(this.props.id, visitOrder);
            } else {
                const visitOrder = [...this.props.visitOrder];
                const targetIndex = visitOrder.indexOf(targetId);
                visitOrder.splice(targetIndex, 0, sourceId);
                this.props.reorderVisit(this.props.id, visitOrder);
                if (originalOrder.length > 1) {
                    const temp = [...originalOrder];
                    temp.splice(sourceIndex, 1);
                    this.props.reorderVisit(fromDay, temp);
                } else {
                    this.props.reorderVisit(fromDay, false);
                }
            }
        });
    }

    render() {
        console.log('day rendered: ' + this.props.id + ' ' + this.props.detail);
        return (
            <div className="day">
                <h3>{this.props.detail}</h3>
                <button onClick={this.handleNewVisit.bind(this)}>New Visit</button>
                <div>
                    {
                        this.props.visitOrder.map(key => {
                            return (
                                <Visit
                                    key={key}
                                    id={key}
                                    day={this.props.id}
                                    moveItem={this.moveItem.bind(this)}
                                />
                            );
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
            visitOrder: state.data.activeTrip.days[props.id].visitOrder ? state.data.activeTrip.days[props.id].visitOrder : emptyArray
        };
    } else {
        return {
            detail: 'loading',
            visitOrder: emptyArray
        };
    }
}

export default connect(mapStateToProps, { newVisit, reorderVisit, fetchDayVisitOrders })(Day);
