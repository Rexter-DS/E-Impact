import { Meteor } from 'meteor/meteor';

Meteor.methods({
  getData: function () {
    let data = {};
    data = JSON.parse(Assets.getText('data.json'));
    return data;
  },
  getMilesTotal: function () {
    let data = {};
    data = JSON.parse(Assets.getText('data.json'));

    let totalMiles = 0;
    let numberOfTrips = 0;
    data[0].trips.forEach((trip) => {
      switch (trip.modeOfTransportation) {
        default:
          break;
        case 'T':
        case 'P':
        case 'B':
        case 'W':
        case 'C':
        case 'E':
          numberOfTrips += 1;
          break;
      }
    });
    totalMiles = numberOfTrips * data[0].homeRoundTrip;

    return totalMiles;
  },
  getFuelSaved: function () {
    let data = {};
    data = JSON.parse(Assets.getText('data.json'));

    const totalMiles = Meteor.call('getMilesTotal');
    const fuelSaved = totalMiles / data[0].autoMPG;

    return fuelSaved;
  },
  getGHGReduced: function () {
    const fuelSaved = Meteor.call('getFuelSaved');
    const ghgReduced = fuelSaved * 19.6;
    
    return ghgReduced;
  },
});
