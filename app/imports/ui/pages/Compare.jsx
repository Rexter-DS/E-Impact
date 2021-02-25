import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Card, Grid, Image } from 'semantic-ui-react';
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

  return (
      <Slider className='compare-slider'>
        {evData.map((value, index) => <Slide index={index} key={index}>
          <Card fluid>
            <Image className='compare-image-card' verticalAlign='middle'
                   src={value.image} href={value.website} target='_blank'/>
            <Card.Content>
              <Card.Header>{value.car}</Card.Header>
              <Card.Description>
                Cash Price: ${value.cashPrice}<br/>
                Range: {value.range} mi<br/>
                Battery Capacity: {value.batteryCapacity} kWh<br/>
              </Card.Description>
            </Card.Content>
          </Card>
        </Slide>)}
      </Slider>
  );
}

function Compare() {

  return (
      <div id='compare-container'>
        <SidebarVisible/>
        <Grid centered>
          <Grid.Column width={7}>
            <Card fluid>
              <Image src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Beater_Nissan.jpg'/>
              <Card.Content>
                <Card.Header>My Car</Card.Header>
                <Card.Description>
                  Cash Price: $13,000<br/>
                  Range: 52 mi<br/>
                  MPG: 30 mi<br/>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={7}>
            <CarouselProvider
                isIntrinsicHeight={true}
                totalSlides={3}
            >
              <SliderHandler/>
              <ButtonBack className='ui icon button'>
                <i className='arrow left icon'/>
              </ButtonBack>
              <ButtonNext className='ui icon button right floated'>
                <i className='arrow right icon'/>
              </ButtonNext>
            </CarouselProvider>
          </Grid.Column>
        </Grid>
      </div>
  );
}

export default Compare;
