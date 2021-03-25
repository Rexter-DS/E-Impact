import React from 'react';
import { Grid, Header, Icon, Container, Button } from 'semantic-ui-react';
import { Link, withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class Info2 extends React.Component {
    render() {
        return (
            <div id='landing-info1'>
                <Grid>
                    <Grid.Column width={4}>
                        <Icon disabled name='chain' size='massive'/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <h1>Create an account to keep track of the emissions of your daily transit</h1>
                        <Button as={NavLink} exact to='/signup' animated>
                            <Button.Content visible>Take me there!</Button.Content>
                            <Button.Content hidden>
                                <Icon name='long arrow alternate right'/>
                            </Button.Content>
                        </Button>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default withRouter(Info2);