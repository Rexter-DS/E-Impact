import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Icon, Statistic } from 'semantic-ui-react';
import DashboardStatisticsCard from './DashboardStatisticsCard';

function DashboardTreeCard(
    {
      treesPerGhgReduced,
      treesPerGhgProduced,
      userProfile,
    },
) {

  return (
      <DashboardStatisticsCard
          cardHeader='Gallons of Fuel'
          topContent={
            <Grid>
              <Grid.Column width={5}>
                <Icon
                    name='tree'
                    color='green'
                    size='huge'
                    style={{ paddingLeft: '1rem', paddingTop: '1rem' }}
                />
              </Grid.Column>
              <Grid.Column width={10} textAlign='center' style={{ paddingLeft: '0.4rem' }}>
                <Statistic >
                  <Statistic.Value>
                    {treesPerGhgReduced}
                  </Statistic.Value>
                  <Statistic.Label>tree equivalence to ghg reduced</Statistic.Label>
                </Statistic>
              </Grid.Column>
            </Grid>
          }
          popupTop='This number represents how many pounds of GHG you reduced by using other modes of transportation.'
          bottomContent={
            <Grid>
              <Grid.Column width={5}>
                <Icon
                    name='tree'
                    color='red'
                    size='huge'
                    style={{ paddingLeft: '1rem', paddingTop: '1rem' }}
                />
              </Grid.Column>
              <Grid.Column width={10} textAlign='center' style={{ paddingLeft: '0.4rem' }}>
                <Statistic >
                  <Statistic.Value>
                    {treesPerGhgProduced}
                  </Statistic.Value>
                  <Statistic.Label>tree equivalence to ghg produced</Statistic.Label>
                </Statistic>
              </Grid.Column>
            </Grid>

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

DashboardTreeCard.propTypes = {
  treesPerGhgReduced: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  treesPerGhgProduced: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  userProfile: PropTypes.object,
};

export default DashboardTreeCard;
