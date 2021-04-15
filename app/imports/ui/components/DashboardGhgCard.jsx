import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Statistic, Table } from 'semantic-ui-react';
import DashboardStatisticsCard from './DashboardStatisticsCard';

function DashboardGhgCard(
    {
      ghgReducedTotal,
      ghgReducedAvg,
      ghgProducedTotal,
      ghgProducedAvg,
      evGhgProducedAvg,
      userProfile,
    },
) {

  const { ghgProducedAvgPerYear, ghgProducedAvgPerMonth, ghgProducedAvgPerDay } = ghgProducedAvg;
  const { ghgReducedAvgPerYear, ghgReducedAvgPerMonth, ghgReducedAvgPerDay } = ghgReducedAvg;
  const { evGhgProducedAvgPerYear, evGhgProducedAvgPerMonth, evGhgProducedAvgPerDay } = evGhgProducedAvg;

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
              <Grid.Row>
                <Grid.Column>
                  <Header textAlign='center'>Average GHG Reduced per Time</Header>
                  <Table basic='very'>
                    <Table.Header fullWidth>
                      <Table.Row>
                        <Table.HeaderCell/>
                        <Table.HeaderCell textAlign='right'>GHG Reduced</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
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
                </Grid.Column>
                <Grid.Column>
                  <Header textAlign='center'>Average GHG Produced per Time</Header>
                  <Table basic='very'>
                    <Table.Header fullWidth>
                      <Table.Row>
                        <Table.HeaderCell/>
                        <Table.HeaderCell textAlign='right'>GHG Produced</Table.HeaderCell>
                        <Table.HeaderCell textAlign='right'>GHG Produced of an EV</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Yearly</Table.Cell>
                        <Table.Cell textAlign='right'>{ghgProducedAvgPerYear} pounds</Table.Cell>
                        <Table.Cell textAlign='right'>{evGhgProducedAvgPerYear} pounds</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Monthly</Table.Cell>
                        <Table.Cell textAlign='right'>{ghgProducedAvgPerMonth} pounds</Table.Cell>
                        <Table.Cell textAlign='right'>{evGhgProducedAvgPerMonth} pounds</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Daily</Table.Cell>
                        <Table.Cell textAlign='right'>{ghgProducedAvgPerDay} pounds</Table.Cell>
                        <Table.Cell textAlign='right'>{evGhgProducedAvgPerDay} pounds</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          }
          userProfile={userProfile}
      />
  );
}

DashboardGhgCard.propTypes = {
  ghgReducedTotal: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ghgReducedAvg: PropTypes.object,
  ghgProducedTotal: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ghgProducedAvg: PropTypes.object,
  evGhgProducedAvg: PropTypes.object,
  userProfile: PropTypes.object,
};

export default DashboardGhgCard;
