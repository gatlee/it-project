import React from 'react';
import { Card } from 'react-bootstrap';

interface PortfolioItemDisplay {
  title: string;
  description: string;
  editable?: boolean;
  onOpenEditor: () => void;
  onDelete: () => void;
}

const PortfolioItemDisplay = (props: PortfolioItemDisplay) => {
  const clamp = {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    webkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };
  return (
    <Card>
      <Card.Img variant="top" src="https://picsum.photos/180/100" />
      <Card.Body>
        <Card.Title>
          <strong>{props.title}</strong>
        </Card.Title>
        <Card.Text style={clamp}>{props.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export { PortfolioItemDisplay };
