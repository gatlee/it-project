import { PortfolioItem } from '@pure-and-lazy/api-interfaces';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown/umd/react-markdown';
import { useParams } from 'react-router-dom';
import { ContentHeader } from '../content/ContentHeader';
import { getPortfolioItem } from '../projects/ProjectUtils';

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
    image: '',
  };
  const [content, setContent] = useState(defaultState);

  const contentStyle = {
    img: {
      maxWidth: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block',
    },
  };
  useEffect(() => {
    getPortfolioItem(contentID).then((res: PortfolioItem) => {
      setContent(res);
    });
  }, [contentID]);

  return (
    <>
      <ContentHeader
        title={content.name}
        subtitle={content.description}
        date={content.created.toLocaleDateString('en-AU')}
        image={content.image || ''}
      />
      <Container className="my-5 p-5 border">
        <ReactMarkdown css={contentStyle} source={content.content} />
      </Container>
      <div className="mt-5" />
    </>
  );
};

export { ContentPage };
