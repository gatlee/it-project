import { css } from 'emotion';
import React, { useEffect, useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { CenteredRowContent } from '../layout/CenteredRowContent';
import BackgroundImage from './../../assets/landscape.png';
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

  const foo = css({
    background: 'white',
    backgroundImage: ` linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${BackgroundImage})`,
    backgroundPosition: 'center',
    width: '100%',
    height: 'auto',
    backgroundSize: 'cover',
  });

  return (
    <>
      <div className={foo}>
        <Container fluid>
          <Container>
            <Row>
              <h1 className="text-white mt-5 mx-3 display-3  text-lg-left text-center w-100">
                Projects
              </h1>
            </Row>
            <Row>
              <h4 className="text-light my-5 mx-3 text-lg-left text-center   w-100">
                <em>Lorem Ipsum Dolor (who knows what to write here?)</em>
              </h4>
            </Row>
          </Container>
        </Container>
      </div>

      <Container className="pt-5">
        {loaded ? <Row>{portfolioItems} </Row> : spinner}
        <Row className="align-items-center my-5">
          <PortfolioAddButton onAdd={updateItems} />
        </Row>
      </Container>
    </>
  );
};

export { PortfolioItemList };
