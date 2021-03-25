import React from 'react';
import { Grid, Header, Icon, Container, Button } from 'semantic-ui-react';
import { Link, withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class Info1 extends React.Component {
    render() {
        return (
            <div id='landing-info1'>
                <Grid divided stackable inverted>
                    <Grid.Row columns={2} style={{ padding:'25px' }}>
                        <Grid.Column verticalAlign='middle'>
                            <h1>Use our GHC estimator to calculate your GHG emissions for a single trip</h1>
                            <Button as={NavLink} exact to='/quickaccess'>
                                <Button.Content visible>Show me!</Button.Content>
                            </Button>
                        </Grid.Column>
                        <Grid.Column className='landing-info-center' verticalAlign='middle'>
                            <Icon disabled name='calculator' size='massive'/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default withRouter(Info1);