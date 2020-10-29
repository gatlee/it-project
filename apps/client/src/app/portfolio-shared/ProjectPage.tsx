import { PortfolioCategory } from '@pure-and-lazy/api-interfaces';
import React from 'react';
import { ItemList } from '../projects/ItemList';
import { TitleBox } from './TitleBox';

// Content of the project tab
const ProjectPage = () => {
  return (
    <>
      <TitleBox title="Projects" subtitle="Projects I've worked on" />
      <ItemList category={PortfolioCategory.PROJECTS} />
    </>
  );
};

export { ProjectPage };
