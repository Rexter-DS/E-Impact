import { Meteor } from 'meteor/meteor';

Meteor.methods({
  getData: function () {
    const data = JSON.parse(Assets.getText('data.json'));
    return data;
  },
  getMilesTotal: function () {
    const data = JSON.parse(Assets.getText('data.json'));

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
    const data = JSON.parse(Assets.getText('data.json'));

    const totalMiles = Meteor.call('getMilesTotal');
    const fuelSaved = totalMiles / data[0].autoMPG;

    return fuelSaved;
  },
  getGHGReduced: function () {
    const fuelSaved = Meteor.call('getFuelSaved');
    const ghgReduced = fuelSaved * 19.6;

    return ghgReduced;
  },
  getModesOfTransport: function () {
    const data = JSON.parse(Assets.getText('data.json'));

    const modes = [
      { mode: 'Telework', value: 0 },
      { mode: 'Public Transportation', value: 0 },
      { mode: 'Biking', value: 0 },
      { mode: 'Walk', value: 0 },
      { mode: 'Carpool', value: 0 },
      { mode: 'Electric Vehicle', value: 0 },
    ];

    data[0].trips.forEach((trip) => {
      switch (trip.modeOfTransportation) {
        default:
          break;
        case 'T':
          modes[0].value += 1;
          break;
        case 'P':
          modes[1].value += 1;
          break;
        case 'B':
          modes[2].value += 1;
          break;
        case 'W':
          modes[3].value += 1;
          break;
        case 'C':
          modes[4].value += 1;
          break;
        case 'E':
          modes[5].value += 1;
          break;
      }
    });

    return modes;
  },
});
