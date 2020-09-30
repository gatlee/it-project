import { PortfolioItem } from '@pure-and-lazy/api-interfaces';
import React from 'react';
import { ItemList } from './ItemList';
import { ProjectItem } from './ProjectItem';
import { ProjectAddButton } from './ProjectAddButton';

const ProjectItemList = () => {
  const fetchProjects = async (username: string): Promise<Response> => {
    return fetch(`/api/portfolio/${username}/all?category=projects`);
  };
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

  const createProjectButton = (onAdd: () => void) => {
    return <ProjectAddButton onAdd={onAdd} />;
  };
  return (
    <ItemList
      callBack={fetchProjects}
      createItem={createProjectItem}
      createAddButton={createProjectButton}
    />
  );
};

export { ProjectItemList };
