import React, { useEffect, useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { PortfolioItem } from './PortfolioItem';
import { PortfolioAddButton } from './PortfolioAddButton';
import { CenteredRowContent } from '../layout/CenteredRowContent';

const PortfolioItemList = () => {
  //TODO Supply this with some context provider
  const username = 'test';
  const editMode = true;

  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const updateItems = () => {
    fetch(`/api/portfolio/${username}/all`)
      .then((r) => r.json())
      .then((r) => setItems(r))
      .then(() => setLoaded(true));
  };

  //Update Items on Load
  useEffect(() => {
    updateItems();
  }, []);

  const portfolioItems = items.map((item, index) => (
    <Row className="mt-4" key={index}>
      <PortfolioItem
        id={item._id}
        title={item.name}
        description={item.description}
        editable={editMode}
        onUpdate={updateItems}
      />
    </Row>
  ));

  const spinner = (
    <Row className="align-tiems-center mt-5">
      <CenteredRowContent>
        <Spinner animation="grow" variant="primary" />
      </CenteredRowContent>
    </Row>
  );

  return (
    <Container fluid>
      {loaded ? portfolioItems : spinner}
      <Row className="align-items-center my-5">
        <PortfolioAddButton onAdd={updateItems} />
      </Row>
    </Container>
  );
};

export { PortfolioItemList };
