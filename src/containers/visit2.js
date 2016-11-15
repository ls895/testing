import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
import { ItemTypes, nonExistentVisit, nonExistentPlace } from '../consts';
import { compose } from 'redux';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

const visitSource = {
    beginDrag(props) {
        return {
            id: props.id
        };
    }
};

const visitTarget = {
    hover(props, monitor) {
      const draggedId = monitor.getItem().id;
      if (draggedId === props.id) {
          return;
      }
      if (draggedId !== props.id) {
        props.moveItem(draggedId, props.id);
      }
    }
};

function collectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

function collectTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class Visit extends Component {
    constructor(props) {
        super(props);
        console.log('visit ' + this.props.id + ' created')
    }
    render() {
        console.log('visit rendered: ' + this.props.id)
        const { connectDragSource, connectDropTarget, isDragging, isOver } = this.props;
        const opacity = isDragging || isOver ? 0 : 1;
        return compose(connectDragSource, connectDropTarget)(
            <div style={{ ...style, opacity }}>
                <p>{this.props.visit.placeid}</p>
                <p>{this.props.place.name}</p>
                <p>{this.props.place.position}</p>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    const visit = state.data.activeTrip.visits[props.id];

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

export default compose(
    DragSource(ItemTypes.VISIT, visitSource, collectSource),
    DropTarget(ItemTypes.VISIT, visitTarget, collectTarget),
    connect(mapStateToProps)
)(Visit);
