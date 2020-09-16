import React, { useEffect, useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { CenteredRowContent } from '../layout/CenteredRowContent';
import { PortfolioAddButton } from './PortfolioAddButton';
import { PortfolioItem } from './PortfolioItem';

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
    <PortfolioItem
      id={item._id}
      key={index}
      title={item.name}
      description={item.description}
      editable={editMode}
      onUpdate={updateItems}
    />
  ));

  const spinner = (
    <Row className="align-tiems-center mt-5">
      <CenteredRowContent>
        <Spinner animation="grow" variant="primary" />
      </CenteredRowContent>
    </Row>
  );

  return (
    <>
      <Container style={{ backgroundColor: '#41A4F5' }} fluid>
        <Container>
          <Row>
            <h1 className="text-white m-4 display-3  text-lg-left text-center w-100">
              Projects
            </h1>
          </Row>
          <Row>
            <h4 className="text-light m-4 text-lg-left text-center   w-100">
              <em>Lorem Ipsum Dolor (who knows what to write here?)</em>
            </h4>
          </Row>
        </Container>
      </Container>

      <Container className="pt-5">
        <div className="card-columns">{loaded ? portfolioItems : spinner}</div>
        <Row className="align-items-center my-5">
          <PortfolioAddButton onAdd={updateItems} />
        </Row>
      </Container>
    </>
  );
};

export { PortfolioItemList };
