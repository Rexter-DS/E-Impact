import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuffCollection/StuffCollection';

// Publish collections
Stuffs.publish();

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
