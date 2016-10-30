import React, { Component } from 'react';
import { connect } from 'react-redux';
import makeOrderVisits from '../selectors/ordered_visits';
import { newVisit } from '../actions/action_from_user';
import Visit from './visit';

class Day extends Component {
    handleNewVisit() {
        this.props.newVisit('trip1', this.props.id, 'p10');
    }

    render() {
        console.log('day rendered for day: ' + this.props.id)
        return <div>
            <h4>{this.props.date}</h4>
            <button onClick={this.handleNewVisit.bind(this)}>New Visit</button>
            <div>
                {
                    this.props.orderedVisits.map(visit => {
                        return (
                            <Visit
                                key={visit.key}
                                id={visit.key}
                                placeid={visit.placeid}
                            />
                        );
                    })
                }
            </div>
        </div>;
    }
}

const makeMapStateToProps = () => {
    const OrderedVisitsSelector = makeOrderVisits();
    const mapStateToProps = (state, props) => {
        console.log('mapstatetoprop run for:' + props.id)
        return {
            orderedVisits: OrderedVisitsSelector(state, props)
        };
    };
    return mapStateToProps;
};

export default connect(makeMapStateToProps, { newVisit })(Day);
