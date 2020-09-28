import React, { useCallback, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Loader } from '../layout/Loader';
import { EditContext } from '../portfolio-shared/EditContext';
import { ProjectAddButton } from './ProjectAddButton';
import { ProjectItem } from './ProjectItem';

const ProjectItemList = () => {
  const { id } = useParams();

  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const loadItems = useCallback(() => {
    fetch(`/api/portfolio/${id}/all`)
      .then((r) => r.json())
      .then((r) => setItems(r))
      .then(() => setLoaded(true));
  }, [id]);

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
      <EditContext.Consumer>
        {(editMode) =>
          editMode && (
            <Row className="align-items-center my-5">
              <ProjectAddButton onAdd={loadItems} />
            </Row>
          )
        }
      </EditContext.Consumer>
    </Container>
  );
};

export { ProjectItemList };
