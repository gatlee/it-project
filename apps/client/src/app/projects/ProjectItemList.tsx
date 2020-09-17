import React, { useEffect, useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { CenteredRowContent } from '../layout/CenteredRowContent';
import { ProjectAddButton } from './ProjectAddButton';
import { ProjectItem } from './ProjectItem';

const ProjectItemList = () => {
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
    <ProjectItem
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
    <Container className="pt-5">
      {loaded ? <Row>{portfolioItems} </Row> : spinner}
      <Row className="align-items-center my-5">
        <ProjectAddButton onAdd={updateItems} />
      </Row>
    </Container>
  );
};

export { ProjectItemList };
