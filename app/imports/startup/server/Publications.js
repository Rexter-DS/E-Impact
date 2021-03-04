import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Trips } from '../../api/trip/TripCollection';
import { Users } from '../../api/user/UserCollection';

/** Publish all the collections you need. */
Stuffs.publish();
Trips.publish();
Users.publish();

/** Need this for the alanning:roles package */
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
