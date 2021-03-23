import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Icon, Container, List, Image } from 'semantic-ui-react';

/**
 * Home
 * Cumulative Data
 * About HEI
 * Join
 * Sign in
 * Submit Feedback
 *
 * Logo
 * CORPORATE HEADQUARTERS
 * 1001 Bishop Street, Suite 2900 Honolulu, Hawaii 96813
 * Telephone: (808) 543-5662
 */

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = (props) => (
    <Container id={props.id}>
      <Grid divided stackable>
          <Grid.Row columns={2} style={{paddin-left: '50px', padding-top:'15px'}}>
              <Grid.Column>
                  <List link inverted>
                      <List.Item as="a" href="/">Home</List.Item>
                      <List.Item as='a'>Calculator</List.Item>
                      <List.Item as='a'>Sign in</List.Item>
                      <List.Item as='a'>About</List.Item>
                  </List>
              </Grid.Column>
              <Grid.Column>
                  <a href={'/#'}>
                      <Image size='small' src="/images/EImpactLogoWhite.png"/>
                  </a>
                  <p>CORPORATE HEADQUARTERS</p>
                  <p>1001 Bishop Street, Suite 2900 Honolulu, Hawaii 96813</p>
                  <p>Telephone: (808) 543-5662</p>
              </Grid.Column>
          </Grid.Row>
      </Grid>
    </Container>
);

Footer.propTypes = {
  id: PropTypes.string,
};

export default Footer;
