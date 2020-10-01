import React from 'react';
import { TitleBox } from '../portfolio-shared/TitleBox';
import { BlogItemList } from './BlogItemList';

const BlogPage = () => {
  return (
    <>
      <TitleBox title="Blog" subtitle="My articles and musings" />
      <BlogItemList />
    </>
  );
};

export { BlogPage };
