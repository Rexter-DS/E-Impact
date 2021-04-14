import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Statistic, Table } from 'semantic-ui-react';
import DashboardStatisticsCard from './DashboardStatisticsCard';

function DashboardGhgCard(
    {
      ghgReducedTotal,
      ghgProducedTotal,
      ghgReducedAvgPerYear,
      ghgReducedAvgPerMonth,
      ghgReducedAvgPerDay,
      ghgProducedAvgPerYear,
      ghgProducedAvgPerMonth,
      ghgProducedAvgPerDay,
      userProfile,
    },
) {

  return (
      <DashboardStatisticsCard
          cardHeader='Green House Gas (GHG)'
          topContent={
            <Statistic>
              <Statistic.Value className='dashboard-statistic'>{ghgReducedTotal}</Statistic.Value>
              <Statistic.Label className='dashboard-statistic'>pounds reduced</Statistic.Label>
            </Statistic>
          }
          popupTop='This number represents how many pounds of GHG you reduced by using other modes of transportation.'
          bottomContent={
            <Statistic>
              <Statistic.Value className='dashboard-statistic'>{ghgProducedTotal}</Statistic.Value>
              <Statistic.Label className='dashboard-statistic'>pounds produced</Statistic.Label>
            </Statistic>
          }
          popupBottom='This number represents how many pounds of GHG you produced by traveling using a gas-powered car.'
          showMore
          moreHeader='More information'
          moreContent={
            <Grid relaxed columns='equal'>
              <Grid.Column>
                <Grid.Row>
                  <Header textAlign='center'>Average GHG Reduced per Time</Header>
                  <Table basic='very'>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Yearly</Table.Cell>
                        <Table.Cell textAlign='right'>{ghgReducedAvgPerYear} pounds</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Monthly</Table.Cell>
                        <Table.Cell textAlign='right'>{ghgReducedAvgPerMonth} pounds</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Daily</Table.Cell>
                        <Table.Cell textAlign='right'>{ghgReducedAvgPerDay} pounds</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Grid.Row>
                <Grid.Row>
                  <Header textAlign='center'>Average GHG Produced per Time</Header>
                  <Table basic='very'>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Yearly</Table.Cell>
                        <Table.Cell textAlign='right'>{ghgProducedAvgPerYear} pounds</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Monthly</Table.Cell>
                        <Table.Cell textAlign='right'>{ghgProducedAvgPerMonth} pounds</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Daily</Table.Cell>
                        <Table.Cell textAlign='right'>{ghgProducedAvgPerDay} pounds</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          }
          userProfile={userProfile}
      />
  );
}

DashboardGhgCard.propTypes = {
  ghgReducedTotal: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ghgProducedTotal: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ghgReducedAvgPerYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ghgReducedAvgPerMonth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ghgReducedAvgPerDay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ghgProducedAvgPerYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ghgProducedAvgPerMonth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ghgProducedAvgPerDay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  userProfile: PropTypes.object,
};

export default DashboardGhgCard;
