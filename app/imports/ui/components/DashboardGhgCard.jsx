import React from 'react';
import PropTypes from 'prop-types';
import { Statistic } from 'semantic-ui-react';
import DashboardStatisticsCard from './DashboardStatisticsCard';

function DashboardGhgCard(
    {
      ghgReducedTotal,
      ghgProducedTotal,
      userProfile,
    },
) {

  return (
      <DashboardStatisticsCard
          cardHeader='Green House Gas (GHG)'
          topContent={
            <Statistic>
              <Statistic.Value>{ghgReducedTotal}</Statistic.Value>
              <Statistic.Label>pounds reduced</Statistic.Label>
            </Statistic>
          }
          popupTop='This number represents how many pounds of GHG you reduced by using other modes of transportation.'
          bottomContent={
            <Statistic>
              <Statistic.Value>{ghgProducedTotal}</Statistic.Value>
              <Statistic.Label>pounds produced</Statistic.Label>
            </Statistic>
          }
          popupBottom='This number represents how many pounds of GHG you produced by traveling using a gas-powered car.'
          moreHeader='More information'
          moreContent={
            <p>
              testing 1 2 3
            </p>
          }
          userProfile={userProfile}
      />
  );
}

DashboardGhgCard.propTypes = {
  ghgReducedTotal: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ghgProducedTotal: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  userProfile: PropTypes.object,
};

export default DashboardGhgCard;
