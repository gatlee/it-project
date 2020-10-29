import {
  PortfolioCategory,
  PortfolioItem,
} from '@pure-and-lazy/api-interfaces';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Loader } from '../layout/Loader';
import { EditContext } from '../portfolio-shared/EditContext';
import { PortfolioAddButton } from '../portfolio-shared/PortfolioAddButton';
import { UserContext } from '../portfolio-shared/UserContext';
import { ProjectItem } from './ProjectItem';
import { getPortfolioItems, getOwnPortfolioItems } from './ProjectUtils';
import { useAuth0 } from '@auth0/auth0-react';
import { EmptyList } from './EmptyList';

interface ItemList {
  category: PortfolioCategory;
}
const ItemList = (props: ItemList) => {
  const editMode = useContext(EditContext);
  const { username } = useContext(UserContext);

  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  // This is kinda gross
  const loadItems = useCallback(() => {
    const promise: Promise<Array<PortfolioItem>> = editMode
      ? getOwnPortfolioItems(props.category, getAccessTokenSilently)
      : getPortfolioItems(username, props.category);
    promise
      .then((r) => setItems(r))
      .then(() => setLoaded(true))
      .catch((e) => {
        console.log(e);
      });
  }, [props, username, editMode, getAccessTokenSilently]);

  //Update Items on Load
  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const itemComponents = items.map((item) => (
    <ProjectItem key={item._id} onUpdate={loadItems} itemInfo={item} />
  ));

  return (
    <Container className="pt-5 mb-5 pb-5">
      <Loader loaded={loaded}>
        {itemComponents.length === 0 ? (
          <EmptyList category={props.category} />
        ) : (
          <Row>{itemComponents} </Row>
        )}
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
