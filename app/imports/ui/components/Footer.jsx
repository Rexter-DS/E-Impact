import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const footerStyle = {
      paddingTop: '15px',
      paddingBottom: '15px' };
    return (
        <footer id="footer" style={footerStyle}>
          <div className="ui center aligned container">
              Environment-Overflow <br />
              University of Hawaii<br />
              Honolulu, HI 96822 <br />
            <a className="link" href="https://environment-overflow.github.io">See more</a>
          </div>
        </footer>
    );
  }
}

export default Footer;
