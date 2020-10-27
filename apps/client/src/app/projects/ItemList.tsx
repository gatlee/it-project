import { PortfolioCategory } from '@pure-and-lazy/api-interfaces';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Loader } from '../layout/Loader';
import { EditContext } from '../portfolio-shared/EditContext';
import { PortfolioAddButton } from '../portfolio-shared/PortfolioAddButton';
import { UserContext } from '../portfolio-shared/UserContext';
import { ProjectItem } from './ProjectItem';
import { getPortfolioItems } from './ProjectUtils';

interface ItemList {
  category: PortfolioCategory;
}
const ItemList = (props: ItemList) => {
  const editMode = useContext(EditContext);
  const { username } = useContext(UserContext);

  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const loadItems = useCallback(() => {
    getPortfolioItems(username, props.category)
      .then((r) => setItems(r))
      .then(() => setLoaded(true))
      .catch((e) => {
        console.log(e);
      });
  }, [props, username]);

  //Update Items on Load
  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const itemComponents = items.map((item, index) => (
    <ProjectItem key={index} onUpdate={loadItems} itemInfo={item} />
  ));

  return (
    <Container className="pt-5">
      <Loader loaded={loaded}>
        <Row>{itemComponents} </Row>
      </Loader>
      {editMode && (
        <Row className="align-items-center my-5">
          <PortfolioAddButton onAdd={loadItems} category={props.category} />
        </Row>
      )}
    </Container>
  );
};

export { ItemList };
