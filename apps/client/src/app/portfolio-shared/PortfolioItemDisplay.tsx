import React from 'react';
import { Card, Col } from 'react-bootstrap';

interface PortfolioItemDisplay {
  title: string;
  description: string;
  editable?: boolean;
  onOpenEditor: () => void;
  onDelete: () => void;
}

const PortfolioItemDisplay = (props: PortfolioItemDisplay) => {
  // Restricts description to 3 lines of text. Anything after gets shortened and gets ... appended
  const clamp: React.CSSProperties = {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };
  const cardNew = {};
  return (
    <Col sm="4" className="py-2">
      <Card style={cardNew} className="h-100">
        <Card.Img variant="top" src="https://picsum.photos/180/100" />
        <Card.Body>
          <Card.Title>
            <strong>{props.title}</strong>
          </Card.Title>
          <Card.Text style={clamp}>{props.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export { PortfolioItemDisplay };
