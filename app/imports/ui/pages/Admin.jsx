import React from 'react';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import UserItem from '../components/UserItem';
import { Users } from '../../api/user/UserCollection';
import SideBar from '../components/SideBar';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Admin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div>
          <SideBar/>
          <Container>
            <Header as="h2" textAlign="center">All Users</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>First Name</Table.HeaderCell>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.users.map((user) => <UserItem key={user._id} user={user} />)}
              </Table.Body>
            </Table>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Admin.propTypes = {
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to the Meteor.Accounts?
  const subscription = Users.subscribeUserAdmin();
  return {
    // users: Users.find({}).fetch(),
    users: Meteor.users.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Admin);
