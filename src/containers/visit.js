import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../consts';
import { compose } from 'redux';

const visitSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Visit extends Component {
    render() {
        const { connectDragSource, isDragging } = this.props;
        if (!this.props.place) {
            return <div>Loading</div>;
        }
        return connectDragSource(
            <div>
                <h5>{this.props.place.name}</h5>
                <h5>{this.props.place.position}</h5>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        place: state.data.activeTrip.places[props.placeid]
    };
}

export default compose(DragSource(ItemTypes.VISIT, visitSource, collect), connect(mapStateToProps))(Visit);
