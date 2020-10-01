import { useAuth0 } from '@auth0/auth0-react';
import { PortfolioItem } from '@pure-and-lazy/api-interfaces';
import React, {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Loader } from '../layout/Loader';
import { EditContext } from '../portfolio-shared/EditContext';

interface ItemList {
  createItem: (
    item: PortfolioItem,
    index: React.Key,
    onUpdate: () => void
  ) => ReactElement;
  fetchUrl: (username: string) => string;
  createAddButton: (onAdd: () => void) => React.ReactElement;
}
const ItemList = (props: ItemList) => {
  const editMode = useContext(EditContext);
  const { id } = useParams();
  const { user } = useAuth0();
  const desiredUser = editMode ? user.nickname : id;

  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const loadItems = useCallback(() => {
    fetch(props.fetchUrl(desiredUser))
      .then((r) => r.json())
      .then((r) => setItems(r))
      .then(() => setLoaded(true))
      .catch((e) => {
        console.log(e);
      });
  }, [props, desiredUser]);

  //Update Items on Load
  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const itemComponents = items.map((item, index) =>
    props.createItem(item, index, loadItems)
  );

  return (
    <Container className="pt-5">
      <Loader loaded={loaded}>
        <Row>{itemComponents} </Row>
      </Loader>
      {editMode && (
        <Row className="align-items-center my-5">
          {props.createAddButton(loadItems)}
        </Row>
      )}
    </Container>
  );
};

export { ItemList };
