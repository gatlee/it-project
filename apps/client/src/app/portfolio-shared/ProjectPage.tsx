import { PortfolioCategory } from '@pure-and-lazy/api-interfaces';
import React from 'react';
import { ItemList } from '../projects/ItemList';
import { TitleBox } from './TitleBox';

// Content of the project tab
const ProjectPage = () => {
  return (
    <>
      <TitleBox
        title="Projects"
        subtitle="Lorem Ipsum Dolor (who knows what to write here?)"
      />
      <ItemList category={PortfolioCategory.PROJECTS} />
    </>
  );
};

export { ProjectPage };
