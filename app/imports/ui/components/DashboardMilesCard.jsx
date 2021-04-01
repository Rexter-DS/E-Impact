import React from 'react';
import PropTypes from 'prop-types';
import { Statistic } from 'semantic-ui-react';
import DashboardStatisticsCard from './DashboardStatisticsCard';

function DashboardMilesCard(
    {
      vehicleMilesSaved,
      vehicleMilesAdded,
    },
) {

  return (
      <DashboardStatisticsCard
          cardHeader='Vehicle Miles Traveled'
          topContent={
            <Statistic>
              <Statistic.Value>{vehicleMilesSaved}</Statistic.Value>
              <Statistic.Label>miles saved</Statistic.Label>
            </Statistic>
          }
          popupTop='This number represents how many miles you traveled using environmentally conscious modes of transportation.'
          bottomContent={
            <Statistic>
              <Statistic.Value>{vehicleMilesAdded}</Statistic.Value>
              <Statistic.Label>miles traveled</Statistic.Label>
            </Statistic>
          }
          popupBottom='This number represents how many you traveled using a gas-powered car'
          moreHeader='More information'
          moreContent={
            <p>
              testing 1 2 3
            </p>
          }
      />
  );
}

DashboardMilesCard.propTypes = {
  vehicleMilesSaved: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  vehicleMilesAdded: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default DashboardMilesCard;
