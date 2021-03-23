import React from 'react';
import { Grid, Header, Icon, Container, Button } from 'semantic-ui-react';
import { Link, withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class Info1 extends React.Component {
    render() {
        return (
            <div id='landing-info1'>
                <h1>Use our GHC estimator to calculate your GHG emissions for a single trip</h1>
                <Button as={NavLink} exact to='/quickaccess'>
                    <Button.Content visible>Show me!</Button.Content>
                </Button>
            </div>
        );
    }
}

export default withRouter(Info1);