import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = (props) => (
  // console.log(alignStyle);
        <Container id={props.id}>
          <div className="ui center aligned container" >
              Environment-Overflow <br />
              This site is in collaboration with <a className="link" href="https://www.hei.com/">HEI Project Footprint</a><br />
              University of Hawaii<br />
              Honolulu, HI 96822 <br />
            <a className="link" href="https://environment-overflow.github.io">See more about our site</a>
          </div>
        </Container>
);

Footer.propTypes = {
  id: PropTypes.string,
};

export default Footer;
