import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Header, Modal, Popup } from 'semantic-ui-react';

// Generalized structure of how a dashboard statistics card is setup.
function DashboardStatisticsCard(
    {
      cardHeader,
      topContent,
      popupTop,
      bottomContent,
      popupBottom,
      moreHeader,
      moreContent,
      userProfile,
    },
) {

  const [openMore, setOpenMore] = useState(false);

  /* DOM Styling */
  useEffect(() => {
    const dashboardCards = document.getElementsByClassName('general-card');
    if (userProfile.theme === 'dark') {
      for (let i = 0; i < dashboardCards.length; i++) {
        dashboardCards[i].classList.add('dark-card');
      }
    } else {
      for (let i = 0; i < dashboardCards.length; i++) {
        dashboardCards[i].classList.remove('dark-card');
      }
    }
  }, [userProfile]);

  return (
      <Card className='general-card'>
        <Card.Header>{cardHeader}</Card.Header>
        <Card.Content textAlign='center'>
          <Popup
              on='hover'
              hideOnScroll
              trigger={topContent}
          >
            <Popup.Content>{popupTop}</Popup.Content>
          </Popup>
        </Card.Content>
        <Card.Content textAlign='center'>
          <Popup
              on='hover'
              hideOnScroll
              trigger={bottomContent}
          >
            <Popup.Content>{popupBottom}</Popup.Content>
          </Popup>
        </Card.Content>
        <Card.Content extra>
          <Modal
              closeIcon
              open={openMore}
              onOpen={() => setOpenMore(true)}
              onClose={() => setOpenMore(false)}
              trigger={<Button className='card-button' compact floated='right'>Show more</Button>}
          >
            <Header>{moreHeader}</Header>
            <Modal.Content>
              {moreContent}
            </Modal.Content>
          </Modal>
        </Card.Content>
      </Card>

  );
}

DashboardStatisticsCard.propTypes = {
  cardHeader: PropTypes.string,
  topContent: PropTypes.element,
  popupTop: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  bottomContent: PropTypes.element,
  popupBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  moreHeader: PropTypes.string,
  moreContent: PropTypes.element,
  userProfile: PropTypes.object,
};

export default DashboardStatisticsCard;
