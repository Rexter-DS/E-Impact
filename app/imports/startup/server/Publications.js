import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Trips } from '../../api/trip/TripCollection';
import { Users } from '../../api/user/UserCollection';
import { SavedTrips } from '../../api/trip/SavedTripCollection';

/** Publish all the collections you need. */
Stuffs.publish();
Trips.publish();
Users.publish();
SavedTrips.publish();

/** Need this for the alanning:roles package */
Meteor.publish(Trips, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Trips.collection.find({ owner: username });
    // return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish(SavedTrips, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return SavedTrips.collection.find({ owner: username });
    // return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish('allUsers', function () {
 return Meteor.users.find();
});
