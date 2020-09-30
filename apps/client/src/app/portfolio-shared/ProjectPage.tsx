import React from 'react';
import { TitleBox } from './TitleBox';
import { ItemList } from '../projects/ItemList';
import { ProjectItem } from '../projects/ProjectItem';

import { PortfolioItem } from '@pure-and-lazy/api-interfaces';
// Content of the project tab
const ProjectPage = () => {
  const createProjectItem = (
    item: PortfolioItem,
    index: React.Key,
    onUpdate: () => void
  ) => (
    <ProjectItem
      id={item._id}
      key={index}
      title={item.name}
      description={item.description}
      content={item.content}
      onUpdate={onUpdate}
    />
  );

  const fetchProjects = async (username: string) => {
    return fetch(`/api/portfolio/${username}/all?category=projects`);
  };

  return (
    <>
      <TitleBox
        title="Projects"
        subtitle="Lorem Ipsum Dolor (who knows what to write here?)"
      />
      <ItemList callBack={fetchProjects} createItem={createProjectItem} />
    </>
  );
};

export { ProjectPage };
