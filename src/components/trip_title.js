import React, { Component } from 'react';

export default class TripTitle extends Component {
    handleClick() {
        this.props.fetchTripDetail(this.props.id);
    }

    render() {
        return (
            <li onClick={this.handleClick.bind(this)}>
                {this.props.id}
            </li>
        );
    }
}
