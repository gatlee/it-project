import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { PortfolioItem } from './PortfolioItem';
import { PortfolioAddButton } from './PortfolioAddButton';
import { useAuth0 } from '@auth0/auth0-react';

const PortfolioItemList = () => {
  //TODO Supply this with some context provider
  //const username = 'test';
  const { user } = useAuth0();
  const username = user.nickname;
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
      {items.map((item, index) => (
        <Row className="mt-4" key={index}>
          <PortfolioItem
            id={item._id}
            title={item.name}
            description={item.description}
            editable={editMode}
            onUpdate={updateItems}
          />
        </Row>
      ))}
      <Row className="align-items-center my-5">
        <PortfolioAddButton onAdd={updateItems} />
      </Row>
    </Container>
  );
};

export { PortfolioItemList };
