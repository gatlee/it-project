import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPortfolioItem } from '../projects/ProjectUtils';
import { Container } from 'react-bootstrap';
import { TitleBox } from '../portfolio-shared/TitleBox';
import { PortfolioItem } from '@pure-and-lazy/api-interfaces';
import ReactMarkdown from 'react-markdown/umd/react-markdown';

const ContentPage = () => {
  const { contentID } = useParams();
  const defaultState: PortfolioItem = {
    _id: '',
    category: undefined,
    name: '',
    description: '',
    content: '',
    created: new Date(),
    lastModified: new Date(),
  };
  const [content, setContent] = useState(defaultState);

  useEffect(() => {
    getPortfolioItem(contentID).then((res: PortfolioItem) => {
      setContent(res);
    });
  }, [contentID]);

  return (
    <>
      <TitleBox
        title={content.name}
        subtitle={content.description}
        date={content.created.toLocaleDateString('en-AU')}
      />
      <Container className="mt-5">
        <ReactMarkdown source={content.content} />
      </Container>
    </>
  );
};

export { ContentPage };
