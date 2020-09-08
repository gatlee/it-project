import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { PortfolioItem } from './PortfolioItem';

const PortfolioItemList = () => {
  //TODO Supply this with some context provider
  const username = 'test';
  const editMode = true;

  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log();
    fetch(`/api/portfolio/${username}/all`)
      .then((r) => r.json())
      .then((r) => setItems(r));
  }, []);

  return (
    <Container fluid>
      {items.map((item) => (
        <Row>
          <PortfolioItem
            id={item._id}
            title={item.name}
            description={item.description}
            editable={editMode}
          />
        </Row>
      ))}
    </Container>
  );
};

export { PortfolioItemList };
