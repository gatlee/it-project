import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { PortfolioItem } from './PortfolioItem';
import BackgroundItem from '../../assets/portfoliobackground.png';

const PortfolioPortfolio = () => {
  const style = {
    backgroundImage: `url(${BackgroundItem}`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100%',
  };
  return (
    <div style={style}>
      <Container fluid>
        <Row>
          <PortfolioItem
            title="Worked at McDonalds"
            description="It was pretty cool I guess"
          />
        </Row>
        <Row>
          <PortfolioItem
            title="Worked at a grocery store"
            description="Not so cool but still kinda cool? "
          />
        </Row>
      </Container>
    </div>

  );
};

export { PortfolioPortfolio };
