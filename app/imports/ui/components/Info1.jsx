import React from 'react';
import { Grid, Header, Icon, Container, Button, Image } from 'semantic-ui-react';
import { Link, withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

//'/quickaccess'

class Info1 extends React.Component {
    render() {
        return (
            <Grid celled stackable>
                <Grid.Row columns={2} style={{ padding:'30px' }}>
                    <Grid.Column className='landing-info-center' verticalAlign='middle'>
                        <a href={'#/quickaccess'}>
                            <div id='landing-info1-left'>
                                <h1 className='landing-white-text'>Want to calculate your carbon footprint?</h1>
                                <hr className='landing-white-text'/>
                                <h2 className='landing-white-text'>Use our GHC estimator to calculate your GHG emissions for a single trip.
                                We also include carpool calculations.</h2>
                                <p className='landing-white-text'>Click here to check it out!</p>
                            </div>
                        </a>
                    </Grid.Column>
                    <Grid.Column className='landing-info-center' verticalAlign='middle'>
                        <h1 id='community-engagement-header' align='center'>Join the Community!</h1>
                        <h2>Create an account to keep track of the emissions of your daily transit and
                            see the changes you are making within your community!</h2>
                        <br/>
                        <a href='#/signup'>
                            <Image src="images/community_info2.png" size="medium" centered/>
                        </a>
                        <br/>
                        <Button as={NavLink} exact to='/signup'>
                            <Button.Content visible>Sign me up!</Button.Content>
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default withRouter(Info1);