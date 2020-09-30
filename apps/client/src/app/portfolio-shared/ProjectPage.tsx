import React from 'react';
import { ProjectItemList } from '../projects/ProjectItemList';
import { TitleBox } from './TitleBox';

// Content of the project tab
const ProjectPage = () => (
  <>
    <TitleBox
      title="Projects"
      subtitle="Lorem Ipsum Dolor (who knows what to write here?)"
    />
    <ProjectItemList />
  </>
);

export { ProjectPage };
