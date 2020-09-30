import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Loader } from '../layout/Loader';
import { EditContext } from '../portfolio-shared/EditContext';
import { ProjectAddButton } from './ProjectAddButton';
import { ProjectItem } from './ProjectItem';

const ProjectItemList = () => {
  const editMode = useContext(EditContext);
  const { id } = useParams();
  const { user } = useAuth0();
  const desiredUser = editMode ? user.nickname : id;

  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const loadItems = useCallback(() => {
    fetch(`/api/portfolio/${desiredUser}/all`)
      .then((r) => r.json())
      .then((r) => setItems(r))
      .then(() => setLoaded(true));
  }, [desiredUser]);

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
      content={item.content}
      onUpdate={loadItems}
    />
  ));

  return (
    <Container className="pt-5">
      <Loader loaded={loaded}>
        <Row>{portfolioItems} </Row>
      </Loader>
      {editMode && (
        <Row className="align-items-center my-5">
          <ProjectAddButton onAdd={loadItems} />
        </Row>
      )}
    </Container>
  );
};

export { ProjectItemList };
