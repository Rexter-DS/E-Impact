import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Trip table. See pages/ListTrip.jsx. */
class TripItem extends React.Component {
  render() {
    let gallons;
    if (this.props.trip.mode === 'Carpool' || this.props.trip.mode === 'Gas Car') {
      gallons = (this.props.trip.distance !== 0 ? ((this.props.trip.distance / this.props.trip.mpg)) : 0);
    } else {
      gallons = 0;
    }
    const ghg = gallons === 0 ? 0 : gallons * 19.6
    return (
        <Table.Row>
          <Table.Cell>{this.props.trip.date.toLocaleDateString()}</Table.Cell>
          <Table.Cell>{this.props.trip.county}</Table.Cell>
          <Table.Cell>{this.props.trip.distance} mi</Table.Cell>
          <Table.Cell>{this.props.trip.mode}</Table.Cell>
          <Table.Cell>{this.props.trip.mpg}</Table.Cell>
          <Table.Cell>{gallons === 0 ? 0 : `${gallons.toFixed(2)} gal`}</Table.Cell>
          <Table.Cell>{ghg === 0 ? 0 : `${ghg.toFixed(2)} GHG`}</Table.Cell>

        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
TripItem.propTypes = {
  trip: PropTypes.object.isRequired,
};

export default TripItem;
