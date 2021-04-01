import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Statistic } from 'semantic-ui-react';
import { Trips } from '../../api/trip/TripCollection';
import DashboardStatisticsCard from './DashboardStatisticsCard';

function DashboardMilesCard(
    {
      milesSaved,
      milesAdded,
    },
) {

  return (
      <DashboardStatisticsCard
          cardHeader='Vehicle Miles Traveled'
          topContent={
            <Statistic>
              <Statistic.Value>{milesSaved}</Statistic.Value>
              <Statistic.Label>miles saved</Statistic.Label>
            </Statistic>
          }
          popupTop='This number represents how many miles you traveled using environmentally conscious modes of transportation.'
          bottomContent={
            <Statistic>
              <Statistic.Value>{milesAdded}</Statistic.Value>
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
  milesSaved: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  milesAdded: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default DashboardMilesCard;
