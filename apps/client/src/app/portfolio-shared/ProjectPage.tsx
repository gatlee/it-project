import React from 'react';
import { TitleBox } from './TitleBox';
import { ProjectItemList } from '../projects/ProjectItemList';

// Content of the project tab
const ProjectPage = () => {
  return (
    <>
      <TitleBox
        title="Projects"
        subtitle="Lorem Ipsum Dolor (who knows what to write here?)"
      />
      <ProjectItemList />
    </>
  );
};

export { ProjectPage };
