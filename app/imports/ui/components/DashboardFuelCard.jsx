import React from 'react';
import PropTypes from 'prop-types';
import { Statistic } from 'semantic-ui-react';
import DashboardStatisticsCard from './DashboardStatisticsCard';

function DashboardFuelCard(
    {
      fuelSavedTotal,
      fuelCostTotal,
    },
) {

  return (
      <DashboardStatisticsCard
          cardHeader='Gallons of Fuel'
          topContent={
            <Statistic>
              <Statistic.Value>{fuelSavedTotal}</Statistic.Value>
              <Statistic.Label>gallons saved</Statistic.Label>
            </Statistic>
          }
          popupTop='This number represents how many gallons of fuel you saved by using other modes of transportation.'
          bottomContent={
            <Statistic>
              <Statistic.Value>{fuelCostTotal}</Statistic.Value>
              <Statistic.Label>gallons spent</Statistic.Label>
            </Statistic>
          }
          popupBottom='This number represents how many gallons of fuel you spent by traveling using a gas-powered car.'
          moreHeader='More information'
          moreContent={
            <p>
              testing 1 2 3
            </p>
          }
      />
  );
}

DashboardFuelCard.propTypes = {
  fuelSavedTotal: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fuelCostTotal: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default DashboardFuelCard;
