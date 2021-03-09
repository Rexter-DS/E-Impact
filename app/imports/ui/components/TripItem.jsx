import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Trip table. See pages/ListTrip.jsx. */
class TripItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.trip.date.toLocaleDateString()}</Table.Cell>
          <Table.Cell>{this.props.trip.distance}</Table.Cell>
          <Table.Cell>{this.props.trip.mode}</Table.Cell>
          <Table.Cell>{this.props.trip.mpg}</Table.Cell>
          <Table.Cell>{this.props.trip.distance}</Table.Cell>
          <Table.Cell>{(this.props.trip.distance / this.props.trip.mpg).toFixed(2)}</Table.Cell>
          <Table.Cell>{((this.props.trip.distance / this.props.trip.mpg) * 19.6).toFixed(2)}</Table.Cell>
          <Table.Cell>{this.props.trip.owner}</Table.Cell>
          <Table.Cell>{this.props.trip.county}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
TripItem.propTypes = {
  trip: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(TripItem);
