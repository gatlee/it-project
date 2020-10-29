import { PortfolioCategory } from '@pure-and-lazy/api-interfaces';
import React from 'react';
import { ItemList } from '../projects/ItemList';
import { TitleBox } from './TitleBox';

// Content of the project tab
const ProjectPage = () => {
  return (
    <>
      <TitleBox title="Projects" subtitle="What I've been working on" />
      <ItemList category={PortfolioCategory.PROJECTS} />
    </>
  );
};

export { ProjectPage };
