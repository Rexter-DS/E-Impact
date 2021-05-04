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

// https://en.wikipedia.org/wiki/Miles_per_gallon_gasoline_equivalent#Conversion_to_MPGe
// MPGe = (33,705 Wh/gal) / (Wh/mi of an electric car)

// https://afdc.energy.gov/vehicles/electric_emissions_sources.html
// average kWh/mi of an EV is 0.32 kWh/mi = 320 Wh/mi

// average MPGe = (33,705 Wh/gal) / (320 Wh/mi) = 105.33 mi/gal
export const avgMpge = 105;

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

    // initialize to be the first date if there are trips.
    let prevDate = new Date();

    _.forEach(userTrips, function (objects) {

      const tripDate = objects.date;
      const tripDistance = objects.distance;
      const tripMode = objects.mode;

      if (prevDate.getTime() !== tripDate.getTime()) {
        if (tripMode !== 'Gas Car') {
          date.push(tripDate);
          mode.push(tripMode);
          distance.push(tripDistance);
        }
        prevDate = tripDate;
      } else {
        mode[mode.length - 1] = mode[mode.length - 1].concat(`, ${tripMode}`);
        distance[distance.length - 1] += tripDistance;
      }
    });

    return { date: date, distance: distance, mode: mode };
  }

  getMilesTraveledPerDay(username) {
    const userTrips = this._collection.find({ owner: username }).fetch();

    const date = [];

    const saved = [];
    const savedMode = [];

    const added = [];
    const addedMode = [];

    let prevDate = new Date();

    _.forEach(userTrips, function (objects) {

      const tripDate = objects.date;
      const tripDistance = objects.distance;
      const tripMode = objects.mode;

      if (prevDate.getTime() === tripDate.getTime()) {
        if (tripMode === 'Gas Car') {
          if (added.length < date.length) {
            addedMode.push(tripMode);
            added.push(-tripDistance);
          } else {
            addedMode[added.length - 1] = tripMode;
            added[added.length - 1] -= tripDistance;
          }
        }

        if (tripMode !== 'Gas Car') {
          if (saved.length < date.length) {
            savedMode.push(tripMode);
            saved.push(tripDistance);
          } else {
            savedMode[savedMode.length - 1] = savedMode[savedMode.length - 1].concat(`, ${tripMode}`);
            saved[saved.length - 1] += tripDistance;
          }
        }
      } else {
        date.push(tripDate);
        prevDate = tripDate;

        if (tripMode === 'Gas Car') {
          addedMode.push(tripMode);
          added.push(-tripDistance);
        } else {
          savedMode.push(tripMode);
          saved.push(tripDistance);

          addedMode.push('');
          added.push(0);
        }
      }
    });

    const print = { date: date, distance: saved, mode: savedMode };
    console.log(print);

    return {
      milesSaved: { date: date, distance: saved, mode: savedMode },
      milesAdded: { date: date, distance: added, mode: addedMode },
    };
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
    let prevDate = new Date();

    _.forEach(userTrips, function (objects) {
      const tripDate = objects.date;
      const tripDistance = objects.distance;
      const tripMode = objects.mode;

      if (tripMode !== 'Gas Car') {
        if (prevDate.getTime() !== tripDate.getTime()) {
          date.push(tripDate);
          ghg.push(((tripDistance / userMpg) * ghgPerGallon).toFixed(2));
          prevDate = tripDate;
        } else {
          let currentGhg = parseFloat(ghg[ghg.length - 1]);
          currentGhg += ((tripDistance / userMpg) * ghgPerGallon);
          ghg[ghg.length - 1] = currentGhg.toFixed(2);
        }
      }

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

    let prevDate = new Date();

    _.forEach(userTrips, function (objects) {
      const tripDate = objects.date;
      const tripDistance = objects.distance;
      const tripMode = objects.mode;

      if (tripMode !== 'Gas Car') {
        if (prevDate.getTime() !== tripDate.getTime()) {
          date.push(tripDate);
          fuel.push((tripDistance / userMPG).toFixed(2));
          price.push(((tripDistance / userMPG) * fuelCost).toFixed(2));
          prevDate = tripDate;
        } else {
          let currentFuel = parseFloat(fuel[fuel.length - 1]);
          currentFuel += (tripDistance / userMPG);
          fuel[fuel.length - 1] = currentFuel.toFixed(2);

          let currentPrice = parseFloat(price[price.length - 1]);
          currentPrice += ((tripDistance / userMPG) * fuelCost);
          price[price.length - 1] = currentPrice.toFixed(2);
        }
      }
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
    const yearMilesSavedAvg = (_.reduce(milesSavedPerYear, function (sum, n) {
      return sum + n;
    }, 0)) / milesSavedPerYear.length;

    const monthMilesSavedAvg = (_.reduce(milesSavedPerMonth, function (sum, n) {
      return sum + n;
    }, 0)) / milesSavedPerMonth.length;

    const dayMilesSavedAvg = dayMilesSaved / totalTrips;

    // calculate average miles traveled per time
    const yearMilesTraveledAvg = (_.reduce(milesTraveledPerYear, function (sum, n) {
      return sum + n;
    }, 0)) / milesTraveledPerYear.length;

    const monthMilesTraveledAvg = (_.reduce(milesTraveledPerMonth, function (sum, n) {
      return sum + n;
    }, 0)) / milesTraveledPerMonth.length;

    const dayMilesTraveledAvg = dayMilesTraveled / totalTrips;

    return {
      milesSavedAvg: {
        year: (yearMilesSavedAvg) ? yearMilesSavedAvg.toFixed(2) : 0,
        month: (monthMilesSavedAvg) ? monthMilesSavedAvg.toFixed(2) : 0,
        day: (dayMilesSavedAvg) ? dayMilesSavedAvg.toFixed(2) : 0,
      },
      milesTraveledAvg: {
        year: (yearMilesTraveledAvg) ? yearMilesTraveledAvg.toFixed(2) : 0,
        month: (monthMilesTraveledAvg) ? monthMilesTraveledAvg.toFixed(2) : 0,
        day: (dayMilesTraveledAvg) ? dayMilesTraveledAvg.toFixed(2) : 0,
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
    const yearFuelSavedAvg = (_.reduce(fuelSavedPerYear, function (sum, n) {
      return sum + n;
    }, 0)) / fuelSavedPerYear.length;

    const monthFuelSavedAvg = (_.reduce(fuelSavedPerMonth, function (sum, n) {
      return sum + n;
    }, 0)) / fuelSavedPerMonth.length;

    const dayFuelSavedAvg = dayFuelSaved / totalTrips;

    // calculate average fuel spent per time
    const yearFuelSpentAvg = (_.reduce(fuelSpentPerYear, function (sum, n) {
      return sum + n;
    }, 0)) / fuelSpentPerYear.length;

    const monthFuelSpentAvg = (_.reduce(fuelSpentPerMonth, function (sum, n) {
      return sum + n;
    }, 0)) / fuelSpentPerMonth.length;

    const dayFuelSpentAvg = dayFuelSpent / totalTrips;

    // return 0 if no data since it will return NaN otherwise
    return {
      fuelSavedAvg: {
        year: (yearFuelSavedAvg) ? yearFuelSavedAvg.toFixed(2) : 0,
        month: (monthFuelSavedAvg) ? monthFuelSavedAvg.toFixed(2) : 0,
        day: (dayFuelSavedAvg) ? dayFuelSavedAvg.toFixed(2) : 0,
      },
      fuelSpentAvg: {
        year: (yearFuelSpentAvg) ? yearFuelSpentAvg.toFixed(2) : 0,
        month: (monthFuelSpentAvg) ? monthFuelSpentAvg.toFixed(2) : 0,
        day: (dayFuelSpentAvg) ? dayFuelSpentAvg.toFixed(2) : 0,
      },
    };
  }

  getGhgAvg(username) {
    const userTrips = this._collection.find({ owner: username }).fetch();

    let currentYear = '';
    let currentMonth = '';

    let yearEvFuel = 0;
    let numOfYear = 0;

    let monthEvFuel = 0;
    let numOfMonth = 0;

    let dayEvFuel = 0;
    let numOfDay = 0;

    _.forEach(userTrips, function (objects) {

      const date = (objects.date.toString()).split(' ');
      const mode = objects.mode;
      const distance = objects.distance;

      const year = date[3];
      const month = date[1];

      if (currentYear !== year) {
        currentYear = year;
        numOfYear += 1;
      }

      if (currentMonth !== month) {
        currentMonth = month;
        numOfMonth += 1;
      }

      numOfDay += 1;

      if (mode === 'Gas Car' || mode === 'Carpool') {
        yearEvFuel += (distance / avgMpge);
        monthEvFuel += (distance / avgMpge);
        dayEvFuel += (distance / avgMpge);
      }
    });

    const yearEvGhgAvg = (yearEvFuel / numOfYear) * ghgPerGallonFuel;
    const monthEvGhgAvg = (monthEvFuel / numOfMonth) * ghgPerGallonFuel;
    const dayEvGhgAvg = (dayEvFuel / numOfDay) * ghgPerGallonFuel;

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
        ghgReducedAvgPerYear: yearGhgReducedAvg,
        ghgReducedAvgPerMonth: monthGhgReducedAvg,
        ghgReducedAvgPerDay: dayGhgReducedAvg,
      },
      ghgProducedAvg: {
        ghgProducedAvgPerYear: yearGhgProducedAvg,
        ghgProducedAvgPerMonth: monthGhgProducedAvg,
        ghgProducedAvgPerDay: dayGhgProducedAvg,
      },
      evGhgProducedAvg: {
        evGhgProducedAvgPerYear: yearEvGhgAvg ? yearEvGhgAvg.toFixed(2) : '0.00',
        evGhgProducedAvgPerMonth: monthEvGhgAvg ? monthEvGhgAvg.toFixed(2) : '0.00',
        evGhgProducedAvgPerDay: dayEvGhgAvg ? dayEvGhgAvg.toFixed(2) : '0.00',
      },
    };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Trips = new TripCollection();
