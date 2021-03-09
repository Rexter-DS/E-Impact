import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Trips } from '../../api/trip/TripCollection';

/** Publish all the collections you need. */
Stuffs.publish();
Trips.publish();

/** Need this for the alanning:roles package */
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish('allUsers', function () {
 return Meteor.users.find();
});
