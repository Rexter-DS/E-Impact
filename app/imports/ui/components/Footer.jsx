import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Container } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const alignStyle = { position: 'fixed', width: '100%', bottom: '0px' };
  // console.log(alignStyle);
    return (
        <Container id="footer" style={alignStyle}>
          <div className="ui center aligned container" >
              Environment-Overflow <br />
              This site is in collaboration with<br />
              <a className="link" href="https://www.hei.com/">HEI Project Footprint</a><br />
              University of Hawaii<br />
              Honolulu, HI 96822 <br />
            <a className="link" href="https://environment-overflow.github.io">See more about our site</a>
          </div>
        </Container>
    );
};

export default Footer;
