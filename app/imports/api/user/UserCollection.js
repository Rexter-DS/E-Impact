import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import swal from 'sweetalert';
import BaseCollection from '../base/BaseCollection';

export const userPublications = {
  user: 'User',
  userAdmin: 'UserAdmin',
};

class UserCollection extends BaseCollection {
  constructor() {
    super('Users', new SimpleSchema({
      username: String,
      autoMPG: Number,
      homeRoundTrip: Number,
    }));
  }

  /**
   * Defines a new Trip item.
   * @param date of trip.
   * @param distance traveled.
   * @param mode of transportation.
   * @param mpg of vehicle.
   * @param owner the owner of the item.
   * @return {String} the docID of the new document.
   */
  define({ username, autoMPG, homeRoundTrip }) {
    const docID = this._collection.insert({
      username,
      autoMPG,
      homeRoundTrip,
    });
    return docID;
  }

  defineWithMessage({ username, autoMPG, homeRoundTrip }) {
    const docID = this._collection.insert({ username, autoMPG, homeRoundTrip },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Sucess');
          }
        });
    return docID;
  }

  getUserProfile(username) {
    const user = this._collection.findOne({ username: username });
    return user;
  }

  /**
   * Updates the given document.
   * @param username: the username of the user.
   * @param autoMPG: the mpg of the user's vehicle.
   * @param homeRoundTrip: the round trip distance between the user's house and their work.
   */
  update(docID, { username, autoMPG, homeRoundTrip }) {
    const updateData = {};
    // if (distance) { NOTE: 0 is falsy so we need to check if the quantity is a number.
    if (username) {
      updateData.username = username;
    }
    if (_.isNumber(autoMPG)) {
      updateData.autoMPG = autoMPG;
    }
    if (_.isNumber(homeRoundTrip)) {
      updateData.homeRoundTrip = homeRoundTrip;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the trip associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the TripCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(userPublications.user, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ username: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(userPublications.userAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for trip owned by the current user.
   */
  subscribeUser() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userPublications.user);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeUserAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userPublications.userAdmin);
    }
    return null;
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Users = new UserCollection();
