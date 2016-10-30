import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTrips } from '../actions/action_trips';
import { fetchTripDetail } from '../actions/action_trip_detail';
import TripTitle from '../components/trip_title';

class TripList extends Component {
    componentDidMount() {
        this.props.fetchTrips('1ZSEuHGCCEYrc1xVbu9ZeSh6mhn2');
    }

    renderTripTitles(trips) {
        return Object.keys(trips).map(id => {
            return <TripTitle
                key={id}
                id={id}
                fetchTripDetail={this.props.fetchTripDetail}
            />;
        });
    }

    render() {
        if (!this.props.trips) {
            return <div>Loading...</div>;
        }
        const { trips } = this.props;
        return (
            <ul>
                {this.renderTripTitles(trips)}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    // console.log('mapstatetoprops run for: TripList')
    return {
        trips: state.data.trips
    };
}


export default connect(mapStateToProps, { fetchTrips, fetchTripDetail })(TripList);
