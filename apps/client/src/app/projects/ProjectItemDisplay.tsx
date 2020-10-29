import React from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { EditContext } from '../portfolio-shared/EditContext';
import { PrivacyIcon } from '../portfolio-shared/PrivacyIcon';

interface ProjectItemDisplay {
  title: string;
  image: string;
  description: string;
  link: string;
  onOpenEditor: () => void;
  onDelete: () => void;
  isPublic: boolean;
}

// Card display that shows the project item
const ProjectItemDisplay = (props: ProjectItemDisplay) => {
  // Restricts description to 6 lines of text. Anything after gets shortened and gets ... appended
  const clamp: React.CSSProperties = {
    display: '-webkit-box',
    WebkitLineClamp: 6,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };

  const imageStyle = {
    background: 'gray',
    //Don't attempt to use objectFit, breaks the compiler
    'object-fit': 'cover',
    height: '25vh',
  };

  const cardNew = {};
  return (
    <Col sm="6" lg="4" className="py-2">
      <Card style={cardNew} className="h-100">
        <LinkContainer to={props.link} className="pointer">
          <Card.Img variant="top" src={props.image || null} css={imageStyle} />
        </LinkContainer>
        <Card.Body>
          <LinkContainer to={props.link} className="pointer">
            <Card.Title>
              <strong>{props.title}</strong>
            </Card.Title>
          </LinkContainer>
          <Card.Text style={clamp}>{props.description}</Card.Text>
          <EditContext.Consumer>
            {(editMode) =>
              editMode && (
                <Container>
                  <Row>
                    <Col className="pl-0">
                      <ButtonGroup>
                        <Button
                          onClick={props.onOpenEditor}
                          variant="outline-primary"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={props.onDelete}
                          variant="outline-danger"
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </Col>
                    <Col className="text-right">
                      <PrivacyIcon hidden={props.isPublic} />
                    </Col>
                  </Row>
                </Container>
              )
            }
          </EditContext.Consumer>
        </Card.Body>
      </Card>
    </Col>
  );
};

export { ProjectItemDisplay };
