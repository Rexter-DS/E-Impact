import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const alignStyle = Meteor.userId() ? { paddingLeft: '150px' } : {paddingLeft: '0px'} ;
  console.log(alignStyle);
    return (
        <footer id="footer" style={alignStyle}>
          <div className="ui center aligned container" >
              Environment-Overflow <br />
              This site is in collaboration with <a className="link" href="https://www.hei.com/">HEI Project Footprint</a><br />
              University of Hawaii<br />
              Honolulu, HI 96822 <br />
            <a className="link" href="https://environment-overflow.github.io">See more about our site</a>
          </div>
        </footer>
    );
};

export default Footer;
