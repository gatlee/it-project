import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { PortfolioItem } from './PortfolioItem';
import { PortfolioAddButton } from './PortfolioAddButton';

const PortfolioItemList = () => {
  //TODO Supply this with some context provider
  const username = 'test';
  const editMode = true;

  const [items, setItems] = useState([]);

  const updateItems = () => {
    fetch(`/api/portfolio/${username}/all`)
      .then((r) => r.json())
      .then((r) => setItems(r));
  };

  //Update Items on Load
  useEffect(() => {
    updateItems();
  }, []);

  return (
    <Container fluid>
      {items.map((item) => (
        <Row className="mt-4">
          <PortfolioItem
            id={item._id}
            title={item.name}
            description={item.description}
            editable={editMode}
          />
        </Row>
      ))}
      <Row className="align-items-center mt-5">
        <PortfolioAddButton />
      </Row>
    </Container>
  );
};

export { PortfolioItemList };
