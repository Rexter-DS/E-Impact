import { Meteor } from 'meteor/meteor';
import { _ } from 'lodash';
import moment from 'moment';
import { Trips } from '../trip/TripCollection';

export const getCountyData = (county) => {
  const nonCarArr = Trips.find({ county: county, mode: { $not: 'Gas Car' } }).fetch().map(function (element) {
    element.fuelSaved = element.distance / element.mpg;
    element.ghgSaved = element.fuelSaved * 19.6;
    return element;
  });

  const nonCarData = nonCarArr.reduce(function (m, d) {
    if (!m[d.date]) {
      m[d.date] = { ...d, count: 1 };
      return m;
    }
    m[d.date].distance += d.distance;
    m[d.date].fuelSaved += d.fuelSaved;
    m[d.date].ghgSaved += d.ghgSaved;
    m[d.date].count += 1;
    return m;
  }, {});

  const nonCarByDay = Object.keys(nonCarData).map(function (k) {
    const item = nonCarData[k];
    return {
      date: item.date,
      distance: item.distance,
      fuelSaved: (item.fuelSaved).toFixed(2),
      ghgSaved: (item.ghgSaved).toFixed(2),
    };
  });

  const carArr = Trips.find({ county: county, mode: 'Gas Car' }).fetch().map(function (element) {
    element.fuelUsed = element.distance / element.mpg;
    element.ghgProduced = element.fuelUsed * 19.6;
    return element;
  });

  const carData = carArr.reduce(function (m, d) {
    if (!m[d.date]) {
      m[d.date] = { ...d, count: 1 };
      return m;
    }
    m[d.date].distance += d.distance;
    m[d.date].fuelUsed += d.fuelUsed;
    m[d.date].ghgProduced += d.ghgProduced;
    m[d.date].count += 1;
    return m;
  }, {});

  const carByDay = Object.keys(carData).map(function (k) {
    const item = carData[k];
    return {
      date: item.date,
      distance: item.distance,
      fuelUsed: (item.fuelUsed).toFixed(2),
      ghgProduced: (item.ghgProduced).toFixed(2),
    };
  });

  const dates = _.map(nonCarByDay, 'date');
  const formattedDates = dates.map((date) => moment(date).format('YYYY-MM-DD'));
  const dates2 = _.map(carByDay, 'date');
  const formattedDates2 = dates2.map((date) => moment(date).format('YYYY-MM-DD'));
  const milesReduced = _.map(nonCarByDay, 'distance');
  const milesProduced = _.map(carByDay, 'distance');
  const fuelSavedByDay = _.map(nonCarByDay, 'fuelSaved');
  const fuelUsedByDay = _.map(carByDay, 'fuelUsed');
  const ghgSavedByDay = _.map(nonCarByDay, 'ghgSaved');
  const ghgProducedByDay = _.map(carByDay, 'ghgProduced');

  const totalUsers = Meteor.users.find({ 'profile.county': county }).count();

  const carDistances = _.map(Trips.find({ county: county, mode: 'Gas Car' }).fetch(), 'distance');
  const carMpgs = _.map(Trips.find({ county: county, mode: 'Gas Car' }).fetch(), 'mpg');
  const fuelUsed = _.zipWith(carDistances, carMpgs, (distance, mpg) => distance / mpg);
  const totalFuelUsed = _.sum(fuelUsed).toFixed(2);
  const totalGhgProduced = (totalFuelUsed * 19.6).toFixed(2);

  const otherDistances = _.map(Trips.find({ county: county, mode: { $not: 'Gas Car' } }).fetch(), 'distance');
  const totalMilesSaved = _.sum(otherDistances).toFixed(2);
  const otherMpgs = _.map(Trips.find({ county: county, mode: { $not: 'Gas Car' } }).fetch(), 'mpg');
  const fuelSaved = _.zipWith(otherDistances, otherMpgs, (distance, mpg) => distance / mpg);
  const totalFuelSaved = _.sum(fuelSaved).toFixed(2);
  const totalGhgReduced = (totalFuelSaved * 19.6).toFixed(2);

  const bikeCount = _.size(Trips.find({ county: county, mode: 'Bike' }).fetch());
  const carpoolCount = _.size(Trips.find({ county: county, mode: 'Carpool' }).fetch());
  const evCount = _.size(Trips.find({ county: county, mode: 'Electric Vehicle' }).fetch());
  const carCount = _.size(Trips.find({ county: county, mode: 'Gas Car' }).fetch());
  const ptCount = _.size(Trips.find({ county: county, mode: 'Public Transportation' }).fetch());
  const teleworkCount = _.size(Trips.find({ county: county, mode: 'Telework' }).fetch());
  const walkCount = _.size(Trips.find({ county: county, mode: 'Walk' }).fetch());

  const modeDistribution = [{
    type: 'pie',
    hole: 0.4,
    values: [bikeCount, carpoolCount, evCount, carCount, ptCount, teleworkCount, walkCount],
    labels: ['Bike', 'Carpool', 'Electric Vehicle', 'Gas Car', 'Public Transportation', 'Telework', 'Walk'],
    hoverinfo: 'label+percent',
    textposition: 'inside',
  }];

  const vmtReduced =
      {
        x: formattedDates,
        y: milesReduced,
        stackgroup: 'one',
        name: 'Reduced',
      };

  const vmtProduced =
      {
        x: formattedDates2,
        y: milesProduced,
        stackgroup: 'one',
        name: 'Produced',
      };

  const vmtData = [vmtReduced, vmtProduced];

  const fuelSavings =
      {
        x: formattedDates,
        y: fuelSavedByDay,
        stackgroup: 'one',
        name: 'Saved',
      };

  const fuelUsage =
      {
        x: formattedDates2,
        y: fuelUsedByDay,
        stackgroup: 'one',
        name: 'Used',
      };

  const fuelData = [fuelSavings, fuelUsage];

  const ghgSavings =
      {
        x: formattedDates,
        y: ghgSavedByDay,
        stackgroup: 'one',
        name: 'Saved',
      };

  const ghgProduction =
      {
        x: formattedDates2,
        y: ghgProducedByDay,
        stackgroup: 'one',
        name: 'Produced',
      };

  const ghgData = [ghgSavings, ghgProduction];

  return {
    totalUsers,
    totalMilesSaved,
    totalFuelUsed,
    totalFuelSaved,
    totalGhgProduced,
    totalGhgReduced,
    modeDistribution,
    vmtReduced,
    vmtProduced,
    vmtData,
    fuelSavings,
    fuelUsage,
    fuelData,
    ghgSavings,
    ghgProduction,
    ghgData,
  };
};

export const getStateData = () => {
  const nonCarArr = Trips.find({ mode: { $not: 'Gas Car' } }).fetch().map(function (element) {
    element.fuelSaved = element.distance / element.mpg;
    element.ghgSaved = element.fuelSaved * 19.6;
    return element;
  });

  const nonCarData = nonCarArr.reduce(function (m, d) {
    if (!m[d.date]) {
      m[d.date] = { ...d, count: 1 };
      return m;
    }
    m[d.date].distance += d.distance;
    m[d.date].fuelSaved += d.fuelSaved;
    m[d.date].ghgSaved += d.ghgSaved;
    m[d.date].count += 1;
    return m;
  }, {});

  const nonCarByDay = Object.keys(nonCarData).map(function (k) {
    const item = nonCarData[k];
    return {
      date: item.date,
      distance: item.distance,
      fuelSaved: (item.fuelSaved).toFixed(2),
      ghgSaved: (item.ghgSaved).toFixed(2),
    };
  });

  const carArr = Trips.find({ mode: 'Gas Car' }).fetch().map(function (element) {
    element.fuelUsed = element.distance / element.mpg;
    element.ghgProduced = element.fuelUsed * 19.6;
    return element;
  });

  const carData = carArr.reduce(function (m, d) {
    if (!m[d.date]) {
      m[d.date] = { ...d, count: 1 };
      return m;
    }
    m[d.date].distance += d.distance;
    m[d.date].fuelUsed += d.fuelUsed;
    m[d.date].ghgProduced += d.ghgProduced;
    m[d.date].count += 1;
    return m;
  }, {});

  const carByDay = Object.keys(carData).map(function (k) {
    const item = carData[k];
    return {
      date: item.date,
      distance: item.distance,
      fuelUsed: (item.fuelUsed).toFixed(2),
      ghgProduced: (item.ghgProduced).toFixed(2),
    };
  });

  const dates = _.map(nonCarByDay, 'date');
  const formattedDates = dates.map((date) => moment(date).format('YYYY-MM-DD'));
  const dates2 = _.map(carByDay, 'date');
  const formattedDates2 = dates2.map((date) => moment(date).format('YYYY-MM-DD'));
  const milesReduced = _.map(nonCarByDay, 'distance');
  const milesProduced = _.map(carByDay, 'distance');
  const fuelSavedByDay = _.map(nonCarByDay, 'fuelSaved');
  const fuelUsedByDay = _.map(carByDay, 'fuelUsed');
  const ghgSavedByDay = _.map(nonCarByDay, 'ghgSaved');
  const ghgProducedByDay = _.map(carByDay, 'ghgProduced');

  const totalUsers = getCountyData('Hawaii').totalUsers + getCountyData('Honolulu').totalUsers +
      getCountyData('Kalawao').totalUsers + getCountyData('Kauai').totalUsers
      + getCountyData('Maui').totalUsers;

  const carDistances = _.map(Trips.find({ mode: 'Gas Car' }).fetch(), 'distance');
  const carMpgs = _.map(Trips.find({ mode: 'Gas Car' }).fetch(), 'mpg');
  const fuelUsed = _.zipWith(carDistances, carMpgs, (distance, mpg) => distance / mpg);
  const totalFuelUsed = _.sum(fuelUsed).toFixed(2);
  const totalGhgProduced = (totalFuelUsed * 19.6).toFixed(2);

  const otherDistances = _.map(Trips.find({ mode: { $not: 'Gas Car' } }).fetch(), 'distance');
  const totalMilesSaved = _.sum(otherDistances).toFixed(2);
  const otherMpgs = _.map(Trips.find({ mode: { $not: 'Gas Car' } }).fetch(), 'mpg');
  const fuelSaved = _.zipWith(otherDistances, otherMpgs, (distance, mpg) => distance / mpg);

  const totalFuelSaved = _.sum(fuelSaved).toFixed(2);
  const totalGhgReduced = (totalFuelSaved * 19.6).toFixed(2);

  const bikeCount = _.size(Trips.find({ mode: 'Bike' }).fetch());
  const carpoolCount = _.size(Trips.find({ mode: 'Carpool' }).fetch());
  const evCount = _.size(Trips.find({ mode: 'Electric Vehicle' }).fetch());
  const carCount = _.size(Trips.find({ mode: 'Gas Car' }).fetch());
  const ptCount = _.size(Trips.find({ mode: 'Public Transportation' }).fetch());
  const teleworkCount = _.size(Trips.find({ mode: 'Telework' }).fetch());
  const walkCount = _.size(Trips.find({ mode: 'Walk' }).fetch());

  const modeDistribution = [{
    type: 'pie',
    hole: 0.4,
    values: [bikeCount, carpoolCount, evCount, carCount, ptCount, teleworkCount, walkCount],
    labels: ['Bike', 'Carpool', 'Electric Vehicle', 'Gas Car', 'Public Transportation', 'Telework', 'Walk'],
    hoverinfo: 'label+percent',
    textposition: 'inside',
  }];

  const vmtReduced =
      {
        x: formattedDates,
        y: milesReduced,
        stackgroup: 'one',
        name: 'Reduced',
      };

  const vmtProduced =
      {
        x: formattedDates2,
        y: milesProduced,
        stackgroup: 'one',
        name: 'Produced',
      };

  const vmtData = [vmtReduced, vmtProduced];

  const fuelSavings =
      {
        x: formattedDates,
        y: fuelSavedByDay,
        stackgroup: 'one',
        name: 'Saved',
      };

  const fuelUsage =
      {
        x: formattedDates2,
        y: fuelUsedByDay,
        stackgroup: 'one',
        name: 'Used',
      };

  const fuelData = [fuelSavings, fuelUsage];

  const ghgSavings =
      {
        x: formattedDates,
        y: ghgSavedByDay,
        stackgroup: 'one',
        name: 'Saved',
      };

  const ghgProduction =
      {
        x: formattedDates2,
        y: ghgProducedByDay,
        stackgroup: 'one',
        name: 'Produced',
      };

  const ghgData = [ghgSavings, ghgProduction];

  const hawaiiData = getCountyData('Hawaii');
  const vmtReducedHawaii = hawaiiData.vmtReduced;
  vmtReducedHawaii.name = 'Hawaii';
  const vmtProducedHawaii = hawaiiData.vmtProduced;
  vmtProducedHawaii.name = 'Hawaii';
  const fuelSavedHawaii = hawaiiData.fuelSavings;
  fuelSavedHawaii.name = 'Hawaii';
  const fuelUsedHawaii = hawaiiData.fuelUsage;
  fuelUsedHawaii.name = 'Hawaii';
  const ghgSavedHawaii = hawaiiData.ghgSavings;
  ghgSavedHawaii.name = 'Hawaii';
  const ghgProducedHawaii = hawaiiData.ghgProduction;
  ghgProducedHawaii.name = 'Hawaii';

  const honoluluData = getCountyData('Honolulu');
  const vmtReducedHonolulu = honoluluData.vmtReduced;
  vmtReducedHonolulu.name = 'Honolulu';
  const vmtProducedHonolulu = honoluluData.vmtProduced;
  vmtProducedHonolulu.name = 'Honolulu';
  const fuelSavedHonolulu = honoluluData.fuelSavings;
  fuelSavedHonolulu.name = 'Honolulu';
  const fuelUsedHonolulu = honoluluData.fuelUsage;
  fuelUsedHonolulu.name = 'Honolulu';
  const ghgSavedHonolulu = honoluluData.ghgSavings;
  ghgSavedHonolulu.name = 'Honolulu';
  const ghgProducedHonolulu = honoluluData.ghgProduction;
  ghgProducedHonolulu.name = 'Honolulu';

  const kalawaoData = getCountyData('Kalawao');
  const vmtReducedKalawao = kalawaoData.vmtReduced;
  vmtReducedKalawao.name = 'Kalawao';
  const vmtProducedKalawao = kalawaoData.vmtProduced;
  vmtProducedKalawao.name = 'Kalawao';
  const fuelSavedKalawao = kalawaoData.fuelSavings;
  fuelSavedKalawao.name = 'Kalawao';
  const fuelUsedKalawao = kalawaoData.fuelUsage;
  fuelUsedKalawao.name = 'Kalawao';
  const ghgSavedKalawao = kalawaoData.ghgSavings;
  ghgSavedKalawao.name = 'Kalawao';
  const ghgProducedKalawao = kalawaoData.ghgProduction;
  ghgProducedKalawao.name = 'Kalawao';

  const kauaiData = getCountyData('Kauai');
  const vmtReducedKauai = kauaiData.vmtReduced;
  vmtReducedKauai.name = 'Kauai';
  const vmtProducedKauai = kauaiData.vmtProduced;
  vmtProducedKauai.name = 'Kauai';
  const fuelSavedKauai = kauaiData.fuelSavings;
  fuelSavedKauai.name = 'Kauai';
  const fuelUsedKauai = kauaiData.fuelUsage;
  fuelUsedKauai.name = 'Kauai';
  const ghgSavedKauai = kauaiData.ghgSavings;
  ghgSavedKauai.name = 'Kauai';
  const ghgProducedKauai = kauaiData.ghgProduction;
  ghgProducedKauai.name = 'Kauai';

  const mauiData = getCountyData('Maui');
  const vmtReducedMaui = mauiData.vmtReduced;
  vmtReducedMaui.name = 'Maui';
  const vmtProducedMaui = mauiData.vmtProduced;
  vmtProducedMaui.name = 'Maui';
  const fuelSavedMaui = mauiData.fuelSavings;
  fuelSavedMaui.name = 'Maui';
  const fuelUsedMaui = mauiData.fuelUsage;
  fuelUsedMaui.name = 'Maui';
  const ghgSavedMaui = mauiData.ghgSavings;
  ghgSavedMaui.name = 'Maui';
  const ghgProducedMaui = mauiData.ghgProduction;
  ghgProducedMaui.name = 'Maui';

  const vmtReducedCounties = [vmtReducedHawaii, vmtReducedHonolulu, vmtReducedKalawao, vmtReducedKauai, vmtReducedMaui];
  const vmtProducedCounties = [vmtProducedHawaii, vmtProducedHonolulu, vmtProducedKalawao, vmtProducedKauai, vmtProducedMaui];
  const fuelSavedCounties = [fuelSavedHawaii, fuelSavedHonolulu, fuelSavedKalawao, fuelSavedKauai, fuelSavedMaui];
  const fuelUsedCounties = [fuelUsedHawaii, fuelUsedHonolulu, fuelUsedKalawao, fuelUsedKauai, fuelUsedMaui];
  const ghgSavedCounties = [ghgSavedHawaii, ghgSavedHonolulu, ghgSavedKalawao, ghgSavedKauai, ghgSavedMaui];
  const ghgProducedCounties = [ghgProducedHawaii, ghgProducedHonolulu, ghgProducedKalawao, ghgProducedKauai, ghgProducedMaui];

  return {
    totalUsers, totalMilesSaved, totalFuelUsed, totalFuelSaved, totalGhgProduced, totalGhgReduced, modeDistribution,
    vmtReduced, vmtProduced, vmtData, fuelData, ghgData, vmtReducedCounties,
    vmtProducedCounties, fuelSavedCounties, fuelUsedCounties, ghgSavedCounties, ghgProducedCounties,
  };
};
