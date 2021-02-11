import React from 'react';
import { Menu, Button, Table, Grid } from 'semantic-ui-react';
import SidebarVisible from '../components/SideBar';

class Daily extends React.Component {

  render() {
    return (
        <div>
          <SidebarVisible/>
          <div id='daily-container' style={{ marginLeft: '150px' }}>
            <Menu borderless id="daily-top">
              <Grid style={{ width: '100%' }}>
                <Grid.Column width={6} verticalAlign='bottom'><Menu.Item className='daily-header-sums'>February
                  2021</Menu.Item></Grid.Column>
                <Grid.Column width={4} textAlign='center'><Menu.Item className='daily-header-sums'>Miles Traveled<br/>13
                  mi</Menu.Item></Grid.Column>
                <Grid.Column width={4} textAlign='center'><Menu.Item className='daily-header-sums'>GHG<br/>10.19 lbs of
                  CO2</Menu.Item></Grid.Column>
                <Grid.Column width={2} verticalAlign='bottom'><Menu.Item position='right'>
                  <Button className='daily-add-button' href={'#/addTrip'}>Add</Button>
                </Menu.Item></Grid.Column>
              </Grid>
            </Menu>
            <Table fixed className='daily-table'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='2' className='daily-table-header'>05 Tue</Table.HeaderCell>
                  <Table.HeaderCell className='daily-table-header'>9 mi</Table.HeaderCell>
                  <Table.HeaderCell className='daily-table-header'>3.92 lb GHG</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell style={{ paddingLeft: '30px' }}>Bike</Table.Cell>
                  <Table.Cell>To work and back</Table.Cell>
                  <Table.Cell>4 mi</Table.Cell>
                  <Table.Cell>0 lb GHG</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell style={{ paddingLeft: '30px' }}>Drove<br/>Honda</Table.Cell>
                  <Table.Cell>To store and back</Table.Cell>
                  <Table.Cell>5 mi</Table.Cell>
                  <Table.Cell>3.92 lb GHG</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Table fixed className='daily-table'>
              <Table.Header className='daily-table-header'>
                <Table.Row>
                  <Table.HeaderCell colSpan='2' className='daily-table-header'>06 Wed</Table.HeaderCell>
                  <Table.HeaderCell className='daily-table-header'>4 mi</ Table.HeaderCell>
                  <Table.HeaderCell className='daily-table-header'>3.14 lb GHG</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell style={{ paddingLeft: '30px' }}>Drove<br/>Honda</Table.Cell>
                  <Table.Cell>To work and back</Table.Cell>
                  <Table.Cell>4 mi</Table.Cell>
                  <Table.Cell>3.14 lb GHG</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
    );
  }
}

export default Daily;
