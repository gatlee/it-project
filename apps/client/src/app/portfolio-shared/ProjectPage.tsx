import React from 'react';
import { ProjectItemList } from '../projects/ProjectItemList';
import { TitleBox } from './TitleBox';

interface ProjectPage {
  editable?: boolean;
}
// Content of the project tab
const ProjectPage = (props: ProjectPage) => (
  <>
    <TitleBox
      title="Projects"
      subtitle="Lorem Ipsum Dolor (who knows what to write here?)"
    />
    <ProjectItemList />
  </>
);

export { ProjectPage };
