import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { ItemTypes, nonExistentVisit, nonExistentPlace } from '../consts';
import { compose } from 'redux';

class Visit extends Component {
    constructor(props) {
        super(props);
        console.log('visit ' + this.props.id + ' created')
    }
    render() {
        console.log('visit rendered: ' + this.props.id)
        return (
            <div>
                <p>{this.props.visit.placeid}</p>
                <p>{this.props.place.name}</p>
                <p>{this.props.place.position}</p>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    var visit = state.data.activeTrip.visits[props.id];

    if (visit) {
        if (state.data.activeTrip.places[visit.placeid]) {
            return {
                visit: visit,
                place: state.data.activeTrip.places[visit.placeid]
            };
        }
        return {
            visit: visit,
            place: nonExistentPlace
        };
    } else {
        return {
            visit: nonExistentVisit,
            place: nonExistentPlace
        };
    }

}

export default connect(mapStateToProps)(Visit);
