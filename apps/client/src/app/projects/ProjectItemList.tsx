import { PortfolioCategory } from '@pure-and-lazy/api-interfaces';
import React from 'react';
import { ItemList } from './ItemList';

const ProjectItemList = () => {
  return <ItemList category={PortfolioCategory.PROJECTS} />;
};

export { ProjectItemList };
