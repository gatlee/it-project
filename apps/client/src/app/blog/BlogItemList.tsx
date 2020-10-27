import { PortfolioCategory } from '@pure-and-lazy/api-interfaces';
import React from 'react';
import { ItemList } from '../projects/ItemList';

const BlogItemList = () => {
  return <ItemList category={PortfolioCategory.BLOG} />;
};

export { BlogItemList };
