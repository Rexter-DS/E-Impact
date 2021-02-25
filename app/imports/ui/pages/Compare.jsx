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

  console.log(evData);

  return (
      <Slider className='compare-slider'>
        {evData.map((value, index) => <Slide index={index} key={index}>
          <Grid centered>
            <Card>
              <Image src={value.image}/>
              <Card.Content>
                <Card.Header>{value.car}</Card.Header>
                <Card.Description>
                  {value.cashPrice}<br/>
                  {value.range}<br/>
                  {value.batteryCapacity}<br/>
                  {value.availableSubsidy}<br/>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid>
        </Slide>)}
      </Slider>
  );
}

function Compare() {

  // constructor(props) {
  //   super(props);
  //   this.state = { evData: [1, 2, 3] };
  //   let data = Meteor.apply('getEVData', { returnStubValue: true }, function (error, result) {
  //     if (!error) {
  //       return result;
  //     }
  //   });
  //   console.log(data);
  // }

    return (
        <div id='compare-container'>
          <SidebarVisible/>
          <CarouselProvider
              naturalSlideWidth={100}
              isIntrinsicHeight={true}
              totalSlides={3}
          >
            <SliderHandler/>
            <ButtonBack className='ui button'>Back</ButtonBack>
            <ButtonNext className='ui button right floated'>Next</ButtonNext>
          </CarouselProvider>
        </div>
    );
}

export default Compare;
