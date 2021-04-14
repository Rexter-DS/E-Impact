import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import _ from 'lodash';
// import { check } from 'meteor/check';
// import { _ } from 'meteor/underscore';
// import { Roles } from 'meteor/alanning:roles';
import swal from 'sweetalert';
import BaseCollection from '../base/BaseCollection';

export const tripModes = ['Telework', 'Public Transportation', 'Bike', 'Walk', 'Carpool', 'Electric Vehicle', 'Gas Car'];
export const tripPublications = {
  trip: 'Trip',
  tripCommunity: 'TripCommunity',
};

export const ghgPerGallonFuel = 19.6;
export const poundsOfGhgPerTree = 48;

// Values taken from https://www.energy.gov/maps/egallon using Hawaii prices
export const fuelCost = 3.10;
export const eGallon = 2.65;

class TripCollection extends BaseCollection {
  constructor() {
    super('Trips', new SimpleSchema({
      date: {
        type: Date,
        defaultValue: new Date(),
      },
      distance: Number,
      mode: {
        type: String,
        allowedValues: tripModes,
        defaultValue: 'Gas Car',
      },
      passenger: {
        type: Number,
        defaultValue: 0,
      },
      mpg: Number,
      owner: String,
      county: String,
    }));
  }

  /**
   * Defines a new Trip item.
   * @param date of trip.
   * @param distance traveled.
   * @param mode of transportation.
   * @param mpg of vehicle.
   * @param owner the owner of the item.
   * @param county the county of the owner.
   * @return {String} the docID of the new document.
   */
  define({ date, distance, mode, passenger, mpg, owner, county }) {
    const docID = this._collection.insert({
      date,
      distance,
      mode,
      passenger,
      mpg,
      owner,
      county,
    });
    return docID;
  }

  defineWithMessage({ date, distance, mode, passenger, mpg, owner, county }) {
    const docID = this._collection.insert({ date, distance, mode, passenger, mpg, owner, county },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Trip added successfully', 'success');
          }
        });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param date the new date.
   * @param distance the new distance (optional).
   * @param mode the new mode (optional).
   * @param mpg the new mpg (optional).
   */
  /* update(docID, { date, distance, mode, mpg }) {
    const updateData = {};
    // if (distance) { NOTE: 0 is falsy so we need to check if the quantity is a number.
    if (date) {
      updateData.date = date;
    }
    if (_.isNumber(distance)) {
      updateData.distance = distance;
    }
    if (mode) {
      updateData.condition = mode;
    }
    if (_.isNumber(mpg)) {
      updateData.mpg = mpg;
    }
    this._collection.update(docID, { $set: updateData });
  } */

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns boolean
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    // check(doc, Object);
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
      Meteor.publish(tripPublications.trip, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          const county = Meteor.users.findOne(this.userId).profile.county;
          return instance._collection.find({ owner: username, county: county });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user. */
      Meteor.publish(tripPublications.tripCommunity, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for trip owned by the current user.
   */
  subscribeTrip() {
    if (Meteor.isClient) {
      return Meteor.subscribe(tripPublications.trip);
    }
    return null;
  }

  /**
   * Subscription method.
   * It subscribes to the entire collection.
   */
  subscribeTripCommunity() {
    if (Meteor.isClient) {
      return Meteor.subscribe(tripPublications.tripCommunity);
    }
    return null;
  }

  /**
   * Gets the modes of transportation that the user has used. Only returning the ones that they used and ignoring the ones that they did not.
   * @param username the username of the user (ex: admin@foo.com)
   * @returns {{label: [], value: []}} an object with two keys, label which is an array of modes of transportation that they used, and value which is an array of count
   * for the respective mode.
   */
  getModesOfTransport(username) {
    const userTrips = this._collection.find({ owner: username }).fetch();
    const modesOfTransport = [
      { mode: 'Telework', value: 0 },
      { mode: 'Public Transportation', value: 0 },
      { mode: 'Bike', value: 0 },
      { mode: 'Walk', value: 0 },
      { mode: 'Carpool', value: 0 },
      { mode: 'Electric Vehicle', value: 0 },
      { mode: 'Gas Car', value: 0 },
    ];

    // iterate over user's trips and increment each value of mode they used.
    _.forEach(userTrips, function (objects) {
      const mode = _.find(modesOfTransport, ['mode', objects.mode]);
      mode.value += 1;
    });

    const modesOfTransportValue = [];
    const modesOfTransportLabel = [];

    // create the formatted data value and label for the charts.
    _.forEach(modesOfTransport, function (objects) {
      if (objects.value !== 0) {
        modesOfTransportValue.push(objects.value);
        modesOfTransportLabel.push(objects.mode);
      }
    });

    return { value: modesOfTransportValue, label: modesOfTransportLabel };
  }

  getMilesPerMode(username) {
    const userTrips = this._collection.find({ owner: username }).fetch();
    const modesOfTransport = [
      { mode: 'Telework', miles: 0 },
      { mode: 'Public Transportation', miles: 0 },
      { mode: 'Bike', miles: 0 },
      { mode: 'Walk', miles: 0 },
      { mode: 'Carpool', miles: 0 },
      { mode: 'Electric Vehicle', miles: 0 },
      { mode: 'Gas Car', miles: 0 },
    ];

    _.forEach(userTrips, function (objects) {
      const tripMode = objects.mode;

      const mode = _.find(modesOfTransport, { mode: tripMode });
      mode.miles += objects.distance;
    });

    return modesOfTransport;
  }

  /**
   * Gets the number of miles traveled using green modes of transport and miles traveled using gas car.
   * @param username the username of the user.
   * @returns {{milesAdded: number, milesSaved: number}} milesAdded is the miles traveled using gas car and miles saved is the number
   * of miles using green modes of transport.
   */
  getVehicleMilesTraveled(username) {
    const userTrips = this._collection.find({ owner: username }).fetch();

    let milesSaved = 0;
    let milesAdded = 0;

    _.forEach(userTrips, function (objects) {
      if (objects.mode === 'Gas Car') {
        milesAdded += objects.distance;
      } else if (objects.mode === 'Carpool') {
        milesAdded += objects.distance;
        milesSaved += (objects.distance * objects.passenger);
      } else {
        milesSaved += objects.distance;
      }
    });

    return { milesSaved: milesSaved, milesAdded: milesAdded };
  }

  /**
   * Returns the total miles that the user has traveled.
   * @param username the username of the user.
   * @returns {number} the total miles.
   */
  getMilesTotal(username) {
    const userTrips = this._collection.find({ owner: username }).fetch();

    let milesSaved = 0;
    _.forEach(userTrips, function (objects) {
      milesSaved += objects.distance;
    });

    return milesSaved;
  }

  /**
   * Returns the miles that the user has saved per day.
   * @param username the username of the user.
   * @returns {{date: [], mode: [], distance: []}}
   * An object that contains an array dates for each trip, an array of modes used for each of those trips and the distance of the trip for respective date.
   */
  getMilesSavedPerDay(username) {
    const userTrips = this._collection.find({ owner: username }).fetch();

    const date = [];
    const distance = [];
    const mode = [];

    _.forEach(userTrips, function (objects) {

      const tripDate = objects.date;
      const tripDistance = objects.distance;
      const tripMode = objects.mode;

      // const exists = _.findIndex(date, function (element) {
      // return _.isEqual(element, tripDate);
      // });

     // if (exists === -1) {

        date.push(tripDate);
        distance.push(tripDistance);
        mode.push(tripMode);
      // } else {

      // const lastDistanceIndex = (distance.length - 1);
      // distance[lastDistanceIndex] += tripDistance;
      // }
    });

    return { date: date, distance: distance, mode: mode };
  }

  /**
   * Returns the GHG that the specified user produced. GHG is produced whenever the user uses the Carpool and Gas Car modes.
   * @param username the username of the user.
   * @param userMPG the MPG of the user
   * @returns {string} the amount of GHG that the user produced. It is a string because the function does a .toFixed(2) to round
   * the number to two decimal places.
   */
  getGHGProducedTotal(username, userMPG) {
    const userTrips = this._collection.find({ owner: username }).fetch();

    const ghgPerGallon = 19.6;
    let ghgProduced = 0;

    _.forEach(userTrips, function (objects) {
      if (objects.mode === 'Gas Car' || objects.mode === 'Carpool') {
        ghgProduced += ((objects.distance / userMPG) * ghgPerGallon);
      }
    });

    return ghgProduced.toFixed(2);
  }

  /**
   * Gets the GHG that the user has reduced each day.
   * @param username the username of the user.
   * @param userMPG the MPG of the user.
   * @returns {{date: [], ghg: []}}
   * An object that contains an array of dates for the trips and an array of GHG that they saved for each of the respective date.
   */
  getGHGReducedPerDay(username, userMpg) {
    const userTrips = this._collection.find({ owner: username }).fetch();

    const date = [];
    const ghg = [];

    const ghgPerGallon = 19.6;

    _.forEach(userTrips, function (objects) {
      date.push(objects.date);
      ghg.push(((objects.distance / userMpg) * ghgPerGallon).toFixed(2));
    });

    return { date: date, ghg: ghg };
  }

  /**
   * Gets the fuel that the user saved per day as well as the dollar saved.
   * @param username the username of the user.
   * @param userMPG the MPG of the user.
   * @returns {{date: [], fuel: [], price: []}}
   * An object that contains an array of dates and an array of fuel and dollar saved for the respective date.
   */
  getFuelSavedPerDay(username, userMPG) {
    const userTrips = this._collection.find({ owner: username }).fetch();

    const date = [];
    const fuel = [];
    const price = [];

    _.forEach(userTrips, function (objects) {
      date.push(objects.date);
      fuel.push((objects.distance / userMPG).toFixed(2));
      price.push(((objects.distance / userMPG) * fuelCost).toFixed(2));
    });

    return { date: date, fuel: fuel, price: price };
  }

  getMilesAvg(username) {
    const userTrips = this._collection.find({ owner: username }).fetch();

    let currentYear = '';
    let currentMonth = '';

    const milesSavedPerYear = [];
    const milesSavedPerMonth = [];

    const milesTraveledPerYear = [];
    const milesTraveledPerMonth = [];

    let yearMilesSaved = 0;
    let monthMilesSaved = 0;
    let dayMilesSaved = 0;

    let yearMilesTraveled = 0;
    let monthMilesTraveled = 0;
    let dayMilesTraveled = 0;

    let totalTrips = 0;

    _.forEach(userTrips, function (objects) {

      const date = (objects.date.toString()).split(' ');
      const mode = objects.mode;
      const distance = objects.distance;
      const numOfPassenger = objects.passenger;

      const year = date[3];
      const month = date[1];

      if (currentYear === '') {

        currentYear = year;
      } else if (currentYear !== year) {

        milesSavedPerYear.push(yearMilesSaved);
        milesTraveledPerYear.push(yearMilesTraveled);

        currentYear = year;
        yearMilesSaved = 0;
        yearMilesTraveled = 0;
      }

      if (currentMonth === '') {

        currentMonth = month;
      } else if (currentMonth !== month) {

        milesSavedPerMonth.push(monthMilesSaved);
        milesTraveledPerMonth.push(monthMilesTraveled);

        currentMonth = month;
        monthMilesSaved = 0;
        monthMilesTraveled = 0;
      }

      if (mode === 'Gas Car') {

        yearMilesTraveled += distance;
        monthMilesTraveled += distance;
        dayMilesTraveled += distance;
      } else if (mode === 'Carpool') {

        yearMilesTraveled += distance;
        yearMilesSaved += (distance * numOfPassenger);

        monthMilesTraveled += distance;
        monthMilesSaved += (distance * numOfPassenger);

        dayMilesTraveled += distance;
        dayMilesSaved += (distance * numOfPassenger);
      } else {

        yearMilesSaved += distance;
        monthMilesSaved += distance;
        dayMilesSaved += distance;
      }

      totalTrips += 1;

      // push if on the last trip
      if (totalTrips === userTrips.length) {
        milesSavedPerYear.push(yearMilesSaved);
        milesSavedPerMonth.push(monthMilesSaved);
        milesTraveledPerYear.push(yearMilesTraveled);
        milesTraveledPerMonth.push(monthMilesTraveled);
      }
    });

    // calculate average miles saved per time
    const yearMilesSavedAvg = ((_.reduce(milesSavedPerYear, function (sum, n) {
      return sum + n;
    }, 0)) / milesSavedPerYear.length).toFixed(2);

    const monthMilesSavedAvg = ((_.reduce(milesSavedPerMonth, function (sum, n) {
      return sum + n;
    }, 0)) / milesSavedPerMonth.length).toFixed(2);

    const dayMilesSavedAvg = (dayMilesSaved / totalTrips).toFixed(2);

    // calculate average miles traveled per time
    const yearMilesTraveledAvg = ((_.reduce(milesTraveledPerYear, function (sum, n) {
      return sum + n;
    }, 0)) / milesTraveledPerYear.length).toFixed(2);

    const monthMilesTraveledAvg = ((_.reduce(milesTraveledPerMonth, function (sum, n) {
      return sum + n;
    }, 0)) / milesTraveledPerMonth.length).toFixed(2);

    const dayMilesTraveledAvg = (dayMilesTraveled / totalTrips).toFixed(2);

    return {
      milesSavedAvg: {
        year: yearMilesSavedAvg || 0,
        month: monthMilesSavedAvg || 0,
        day: dayMilesSavedAvg || 0,
      },
      milesTraveledAvg: {
        year: yearMilesTraveledAvg || 0,
        month: monthMilesTraveledAvg || 0,
        day: dayMilesTraveledAvg || 0,
      },
    };
  }

  getFuelAvg(username) {
    const userTrips = this._collection.find({ owner: username }).fetch();

    let currentYear = '';
    let currentMonth = '';

    const fuelSavedPerYear = [];
    const fuelSavedPerMonth = [];

    const fuelSpentPerYear = [];
    const fuelSpentPerMonth = [];

    let yearFuelSaved = 0;
    let monthFuelSaved = 0;
    let dayFuelSaved = 0;

    let yearFuelSpent = 0;
    let monthFuelSpent = 0;
    let dayFuelSpent = 0;

    let totalTrips = 0;

    _.forEach(userTrips, function (objects) {

      const date = (objects.date.toString()).split(' ');
      const mode = objects.mode;
      const distance = objects.distance;
      const numOfPassenger = objects.passenger;
      const mpg = objects.mpg; // mpg may differ each trip

      const year = date[3];
      const month = date[1];

      if (currentYear === '') {

        currentYear = year;
      } else if (currentYear !== year) {

        fuelSavedPerYear.push(yearFuelSaved);
        fuelSpentPerYear.push(yearFuelSpent);

        currentYear = year;
        yearFuelSaved = 0;
        yearFuelSpent = 0;
      }

      if (currentMonth === '') {

        currentMonth = month;
      } else if (currentMonth !== month) {

        fuelSavedPerMonth.push(monthFuelSaved);
        fuelSpentPerMonth.push(monthFuelSpent);

        currentMonth = month;
        monthFuelSaved = 0;
        monthFuelSpent = 0;
      }

      if (mode === 'Gas Car') {

        yearFuelSpent += (distance / mpg);
        monthFuelSpent += (distance / mpg);
        dayFuelSpent += (distance / mpg);
      } else if (mode === 'Carpool') {

        yearFuelSpent += (distance / mpg);
        yearFuelSaved += ((distance * numOfPassenger) / mpg);

        monthFuelSpent += (distance / mpg);
        monthFuelSaved += ((distance * numOfPassenger) / mpg);

        dayFuelSpent += (distance / mpg);
        dayFuelSaved += ((distance * numOfPassenger) / mpg);
      } else {

        yearFuelSaved += (distance / mpg);
        monthFuelSaved += (distance / mpg);
        dayFuelSaved += (distance / mpg);
      }

      totalTrips += 1;

      // push if on the last trip
      if (totalTrips === userTrips.length) {
        fuelSavedPerYear.push(yearFuelSaved);
        fuelSavedPerMonth.push(monthFuelSaved);
        fuelSpentPerYear.push(yearFuelSpent);
        fuelSpentPerMonth.push(monthFuelSpent);
      }
    });

    // calculate average fuel saved per time
    const yearFuelSavedAvg = ((_.reduce(fuelSavedPerYear, function (sum, n) {
      return sum + n;
    }, 0)) / fuelSavedPerYear.length).toFixed(2);

    const monthFuelSavedAvg = ((_.reduce(fuelSavedPerMonth, function (sum, n) {
      return sum + n;
    }, 0)) / fuelSavedPerMonth.length).toFixed(2);

    const dayFuelSavedAvg = (dayFuelSaved / totalTrips).toFixed(2);

    // calculate average fuel spent per time
    const yearFuelSpentAvg = ((_.reduce(fuelSpentPerYear, function (sum, n) {
      return sum + n;
    }, 0)) / fuelSpentPerYear.length).toFixed(2);

    const monthFuelSpentAvg = ((_.reduce(fuelSpentPerMonth, function (sum, n) {
      return sum + n;
    }, 0)) / fuelSpentPerMonth.length).toFixed(2);

    const dayFuelSpentAvg = (dayFuelSpent / totalTrips).toFixed(2);

    // return 0 if no data since it will return NaN otherwise
    return {
      fuelSavedAvg: {
        year: yearFuelSavedAvg || 0,
        month: monthFuelSavedAvg || 0,
        day: dayFuelSavedAvg || 0,
      },
      fuelSpentAvg: {
        year: yearFuelSpentAvg || 0,
        month: monthFuelSpentAvg || 0,
        day: dayFuelSpentAvg || 0,
      },
    };
  }

  getGhgAvg(username) {
    const fuelAvg = this.getFuelAvg(username);

    const fuelSavedAvg = fuelAvg.fuelSavedAvg;
    const yearGhgReducedAvg = (fuelSavedAvg.year * ghgPerGallonFuel).toFixed(2);
    const monthGhgReducedAvg = (fuelSavedAvg.month * ghgPerGallonFuel).toFixed(2);
    const dayGhgReducedAvg = (fuelSavedAvg.day * ghgPerGallonFuel).toFixed(2);

    const fuelSpentAvg = fuelAvg.fuelSpentAvg;
    const yearGhgProducedAvg = (fuelSpentAvg.year * ghgPerGallonFuel).toFixed(2);
    const monthGhgProducedAvg = (fuelSpentAvg.month * ghgPerGallonFuel).toFixed(2);
    const dayGhgProducedAvg = (fuelSpentAvg.day * ghgPerGallonFuel).toFixed(2);

    return {
      ghgReducedAvg: {
        year: yearGhgReducedAvg,
        month: monthGhgReducedAvg,
        day: dayGhgReducedAvg,
      },
      ghgProducedAvg: {
        year: yearGhgProducedAvg,
        month: monthGhgProducedAvg,
        day: dayGhgProducedAvg,
      },
    };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Trips = new TripCollection();
