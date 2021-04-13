import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Statistic, Table } from 'semantic-ui-react';
import DashboardStatisticsCard from './DashboardStatisticsCard';

function DashboardFuelCard(
    {
      fuelSavedTotal,
      fuelCostTotal,
      fuelSavedAvgPerYear,
      fuelSavedAvgPerMonth,
      fuelSavedAvgPerDay,
      fuelSpentAvgPerYear,
      fuelSpentAvgPerMonth,
      fuelSpentAvgPerDay,
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
            <Grid>
              <Grid.Column>
                <Grid.Row>
                  <Header textAlign='center'>Average Gallons Saved per Time</Header>
                  <Table basic='very'>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Yearly</Table.Cell>
                        <Table.Cell textAlign='right'>{fuelSavedAvgPerYear} gallons</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Monthly</Table.Cell>
                        <Table.Cell textAlign='right'>{fuelSavedAvgPerMonth} gallons</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Daily</Table.Cell>
                        <Table.Cell textAlign='right'>{fuelSavedAvgPerDay} gallons</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Grid.Row>
                <Grid.Row>
                  <Header textAlign='center'>Average Gallons Spent per Time</Header>
                  <Table basic='very'>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Yearly</Table.Cell>
                        <Table.Cell textAlign='right'>{fuelSpentAvgPerYear} gallons</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Monthly</Table.Cell>
                        <Table.Cell textAlign='right'>{fuelSpentAvgPerMonth} gallons</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Daily</Table.Cell>
                        <Table.Cell textAlign='right'>{fuelSpentAvgPerDay} gallons</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          }
      />
  );
}

DashboardFuelCard.propTypes = {
  fuelSavedTotal: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fuelCostTotal: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fuelSavedAvgPerYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fuelSavedAvgPerMonth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fuelSavedAvgPerDay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fuelSpentAvgPerYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fuelSpentAvgPerMonth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fuelSpentAvgPerDay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default DashboardFuelCard;
