import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { CenteredRowContent } from '../layout/CenteredRowContent';
import { ProjectAddButton } from './ProjectAddButton';
import { ProjectItem } from './ProjectItem';

const ProjectItemList = () => {
  const { user } = useAuth0();
  const username = user ? user.nickname : 'test';
  const editMode = true;

  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const loadItems = useCallback(() => {
    fetch(`/api/portfolio/${username}/all`)
      .then((r) => r.json())
      .then((r) => setItems(r))
      .then(() => setLoaded(true));
  }, [username]);

  //Update Items on Load
  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const portfolioItems = items.map((item, index) => (
    <ProjectItem
      id={item._id}
      key={index}
      title={item.name}
      description={item.description}
      editable={editMode}
      onUpdate={loadItems}
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
        <ProjectAddButton onAdd={loadItems} />
      </Row>
    </Container>
  );
};

export { ProjectItemList };
