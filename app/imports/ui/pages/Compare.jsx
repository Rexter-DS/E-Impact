import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Grid, Header, Image, Card, Divider } from 'semantic-ui-react';
import SidebarVisible from '../components/SideBar';

function SliderHandler() {
  const [evData, setEVData] = useState([]);

  useEffect(() => {
    Meteor.call('getEVData', function (error, result) {
      if (!error) {
        setEVData(result);
      }
    });
  }, [setEVData]);

  const [totalMiles, setTotalMiles] = useState(0);

  useEffect(() => {
    Meteor.call('getMilesTotal', function (error, result) {
      if (!error) {
        setTotalMiles(result);
      }
    });
  }, [totalMiles]);

  const testMPG = 25;
  const avgGasPrice = 3.52;
  const gasCost = (100 / testMPG) * avgGasPrice;
  const costPerkWh = 0.2874;

  return (
      <Slider className='compare-slider'>
        {evData.map((value, index) => <Slide index={index} key={index}>
          <Grid centered columns={2} divided>
            <Grid.Column width={6}>
              <Image className='compare-image-card' src={value.brandLogo} size='small'/>
              <Image className='compare-image-card' src={value.image} size='large' href={value.website}
                     target='_blank'/>
              <Header textAlign='center'>{value.car}</Header>
            </Grid.Column>
            <Grid.Column width={10} className='slider-information-side'>
              <Grid.Row textAlign='left'>Starting From: ${value.cashPrice}</Grid.Row>
              <Grid.Row textAlign='left'>Range: {value.range} mi</Grid.Row>
              <Grid.Row textAlign='left'>Battery Capacity: {value.batteryCapacity} kWh</Grid.Row>
              <Grid.Row>
                  <Header className='cost-per-header' textAlign='center'>Cost Per 100 mi</Header>
                  <Card.Group className='cost-per-inner-cards' centered itemsPerRow={2}>
                    <Card fluid>
                      <Card.Content textAlign='center'>
                        Electric Vehicle
                        <Divider/>
                        ${((100 / (value.range / value.batteryCapacity)) * costPerkWh).toFixed(2)}
                      </Card.Content>
                    </Card>
                    <Card fluid>
                      <Card.Content textAlign='center'>
                        Gas
                        <Divider />
                        ${gasCost.toFixed(2)}
                      </Card.Content>
                    </Card>
                  </Card.Group>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Slide>)}
      </Slider>
  );
}

function Compare() {

  return (
      <div id='compare-container'>
        <SidebarVisible/>
        <CarouselProvider
            isIntrinsicHeight={true}
            totalSlides={3}
            infinite={true}
        >
          <Grid>
            <Grid.Row>
              <SliderHandler/>
            </Grid.Row>
            <Grid.Row>
              <ButtonBack className='ui icon button'>
                <i className='arrow left icon'/>
              </ButtonBack>
              <ButtonNext className='ui icon button right floated'>
                <i className='arrow right icon'/>
              </ButtonNext>
            </Grid.Row>
          </Grid>
        </CarouselProvider>
      </div>
  );
}

export default Compare;
