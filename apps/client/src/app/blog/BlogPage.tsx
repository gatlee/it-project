import { PortfolioCategory } from '@pure-and-lazy/api-interfaces';
import React from 'react';
import { TitleBox } from '../portfolio-shared/TitleBox';
import { ItemList } from '../projects/ItemList';

const BlogPage = () => {
  return (
    <>
      <TitleBox title="Blog" subtitle="My articles and musings" />
      <ItemList category={PortfolioCategory.BLOG} />
    </>
  );
};

export { BlogPage };
