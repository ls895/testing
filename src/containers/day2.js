import React, { Component } from 'react';
import { connect } from 'react-redux';
import makeOrderVisits from '../selectors/ordered_visits';
import { newVisit } from '../actions/action_from_user';
import { emptyArray } from '../consts';
import Visit from './visit2';

class Day extends Component {
    handleNewVisit() {
        this.props.newVisit(this.props.id, 'p10');
    }

    render() {
        console.log('day rendered: ' + this.props.id + ' ' + this.props.detail)
        return (
            <div>
                <h3>{this.props.detail}</h3>
                <button onClick={this.handleNewVisit.bind(this)}>New Visit</button>
                <div>
                    {
                        this.props.visitOrder.map(key => {
                            return (
                                <Visit
                                    key={key}
                                    id={key}
                                />
                            )
                        })
                    }
                </div>
            </div>
        );
    }
    // render() {
    //     console.log('day rendered for day: ' + this.props.id)
    //     return <div>
    //         <h4>{this.props.date}</h4>
    //         <button onClick={this.handleNewVisit.bind(this)}>New Visit</button>
    //         <div>
    //             {
    //                 this.props.orderedVisits.map(visit => {
    //                     return (
    //                         <Visit
    //                             key={visit.key}
    //                             id={visit.key}
    //                             placeid={visit.placeid}
    //                         />
    //                     );
    //                 })
    //             }
    //         </div>
    //     </div>;
    // }
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

export default connect(mapStateToProps, { newVisit })(Day);
