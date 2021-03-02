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
    data[3].trips.forEach((trip) => {
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
    totalMiles = numberOfTrips * data[3].homeRoundTrip;

    return totalMiles.toFixed(2);
  },
  getFuelSaved: function () {
    const data = JSON.parse(Assets.getText('data.json'));

    let totalMiles = 0;
    let numberOfTrips = 0;
    data[3].trips.forEach((trip) => {
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

    totalMiles = numberOfTrips * data[3].homeRoundTrip;
    const fuelSaved = totalMiles / data[3].autoMPG;

    return fuelSaved.toFixed(2);
  },
  getGHGReduced: function () {
    const data = JSON.parse(Assets.getText('data.json'));

    let totalMiles = 0;
    let numberOfTrips = 0;
    data[3].trips.forEach((trip) => {
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
    totalMiles = numberOfTrips * data[3].homeRoundTrip;

    const fuelSaved = totalMiles / data[3].autoMPG;
    const ghgReduced = fuelSaved * 19.6;

    return ghgReduced.toFixed(2);
  },
  getModesOfTransport: function () {
    const data = JSON.parse(Assets.getText('data.json'));

    const modes = [];
    let result;

    data[3].trips.forEach((trip) => {
      switch (trip.modeOfTransportation) {
        default:
          break;
        case 'T':
          result = modes.find(({ mode }) => mode === 'Telework');
          if (result == null) {
            modes.push({ mode: 'Telework', value: 1 });
          } else {
            result.value += 1;
          }
          break;
        case 'P':
          result = modes.find(({ mode }) => mode === 'Public\nTransport');
          if (result == null) {
            modes.push({ mode: 'Public\nTransport', value: 1 });
          } else {
            result.value += 1;
          }
          break;
        case 'B':
          result = modes.find(({ mode }) => mode === 'Biking');
          if (result == null) {
            modes.push({ mode: 'Biking', value: 1 });
          } else {
            result.value += 1;
          }
          break;
        case 'W':
          result = modes.find(({ mode }) => mode === 'Walking');
          if (result == null) {
            modes.push({ mode: 'Walking', value: 1 });
          } else {
            result.value += 1;
          }
          break;
        case 'C':
          result = modes.find(({ mode }) => mode === 'Carpool');
          if (result == null) {
            modes.push({ mode: 'Carpool', value: 1 });
          } else {
            result.value += 1;
          }
          break;
        case 'E':
          result = modes.find(({ mode }) => mode === 'Electric Vehicle');
          if (result == null) {
            modes.push({ mode: 'Electric Vehicle', value: 1 });
          } else {
            result.value += 1;
          }
          break;
      }
    });

    return modes;
  },
  getMilesSavedPerDay: function () {
    const data = JSON.parse(Assets.getText('data.json'));

    const milesSaved = [
      { day: 'Sunday', miles: 0 },
      { day: 'Monday', miles: 0 },
      { day: 'Tuesday', miles: 0 },
      { day: 'Wednesday', miles: 0 },
      { day: 'Thursday', miles: 0 },
      { day: 'Friday', miles: 0 },
      { day: 'Saturday', miles: 0 },
    ];

    let index = 0;
    data[3].trips.forEach((trip) => {
      if (trip.modeOfTransportation !== '') {
        switch (index) {
          default:
            index = 0;
            break;
          case 0:
            milesSaved[0].miles += data[3].homeRoundTrip;
            break;
          case 1:
            milesSaved[1].miles += data[3].homeRoundTrip;
            break;
          case 2:
            milesSaved[2].miles += data[3].homeRoundTrip;
            break;
          case 3:
            milesSaved[3].miles += data[3].homeRoundTrip;
            break;
          case 4:
            milesSaved[4].miles += data[3].homeRoundTrip;
            break;
          case 5:
            milesSaved[5].miles += data[3].homeRoundTrip;
            break;
          case 6:
            milesSaved[6].miles += data[3].homeRoundTrip;
            break;
        }
      }
      index += 1;
    });

    return milesSaved;
  },
  getMonthlyGHGReport: function () {
    const data = JSON.parse(Assets.getText('data.json'));

    let month;

    const monthlyReport = [
      { month: 'March', GHGReduced: 0 },
      { month: 'April', GHGReduced: 0 },
    ];

    data[3].trips.forEach((trip) => {
      switch (trip.modeOfTransportation) {
        default:
          break;
        case 'T':
        case 'P':
        case 'B':
        case 'W':
        case 'C':
        case 'E':
          month = trip.date.split('-');
          switch (month[1]) {
            default:
              break;
            case '03':
              monthlyReport[0].GHGReduced += (data[3].homeRoundTrip / data[3].autoMPG) * 19.6;

              break;
            case '04':
              monthlyReport[1].GHGReduced += (data[3].homeRoundTrip / data[3].autoMPG) * 19.6;
              break;
          }
          break;
      }
    });

    let temp;

    temp = monthlyReport[0].GHGReduced;
    monthlyReport[0].GHGReduced = temp.toFixed(2);

    temp = monthlyReport[1].GHGReduced;
    monthlyReport[1].GHGReduced = temp.toFixed(2);

    return monthlyReport;
  },
  getEVData: function () {
    const data = JSON.parse(Assets.getText('evdata.json'));
    return data;
  },
});
