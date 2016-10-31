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
            id: props.id,
            day: props.day,
            index: props.index
        };
    },
    // endDrag(props, monitor) {
    //     const { droppedAtDay } = monitor.getDropResult();
    //     if (droppedAtDay === props.day) {
    //         console.log('dropped on the same day');
    //     } else {
    //         props.removeVisit(props.id);
    //     }
    // }
};

const visitTarget = {
    // drop(props) {
    //     return {
    //         droppedAtDay: props.day
    //     };
    // },
    hover(props, monitor) {
      const draggedId = monitor.getItem().id;
      const fromDay = monitor.getItem().day;
      if (draggedId === props.id) {
          return;
      }


      if (draggedId !== props.id) {
        props.moveItem(draggedId, fromDay, props.id);
      }
    }
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
    };
}

function collectTarget(connect) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

class Visit extends Component {
    constructor(props) {
        super(props);
        console.log('visit ' + this.props.id + ' created')
    }
    render() {
        console.log('visit rendered: ' + this.props.id)
        const { connectDragSource, connectDropTarget, isDragging } = this.props;
        const opacity = isDragging ? 1 : 1;
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

export default compose(
    DragSource(ItemTypes.VISIT, visitSource, collectSource),
    DropTarget(ItemTypes.VISIT, visitTarget, collectTarget),
    connect(mapStateToProps)
)(Visit);
