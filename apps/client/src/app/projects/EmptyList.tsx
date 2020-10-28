import React, { useContext } from 'react';
import { PortfolioCategory } from '@pure-and-lazy/api-interfaces';
import { Container, Row } from 'react-bootstrap';
import { EditContext } from '../portfolio-shared/EditContext';

interface EmptyList {
  category: PortfolioCategory;
}

const EmptyList = (props: EmptyList) => {
  const isEditMode = useContext(EditContext);
  const largeText =
    props.category === PortfolioCategory.BLOG
      ? 'No posts yet'
      : 'No projects yet';
  const subtext1 =
    props.category === PortfolioCategory.BLOG
      ? 'Write your thoughts and musings here'
      : 'Show off some of your work!';
  const subtext2 =
    props.category === PortfolioCategory.BLOG
      ? "Click 'Add Post' to add a blog post to your portfolio!"
      : "Click 'Add Project' to add a project to your portfolio";
  return (
    <Container>
      <Row className="mt-3">
        <h1
          className="text-center m-auto display-4"
          css={{ font: 'Roboto', fontWeight: 600 }}
        >
          {largeText}
        </h1>
      </Row>
      {isEditMode && (
        <Row className="mt-5">
          <p className="text-center m-auto " css={{ font: 'Roboto' }}>
            {subtext1} {'\n'} <br />
            {subtext2}
          </p>
        </Row>
      )}
    </Container>
  );
};

export { EmptyList };
