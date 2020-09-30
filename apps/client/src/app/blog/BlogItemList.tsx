import React from 'react';
import { ProjectItem } from '../projects/ProjectItem';
import { PortfolioItem } from '@pure-and-lazy/api-interfaces';
import { ItemList } from '../projects/ItemList';
import { ProjectAddButton } from '../projects/ProjectAddButton';

const BlogItemList = () => {
  const fetchProjects = async (username: string): Promise<Response> => {
    return fetch(`/api/portfolio/${username}/all?category=blog`);
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

  const createBlogButton = (onAdd: () => void) => {
    return <ProjectAddButton onAdd={onAdd} />;
  };
  return (
    <ItemList
      callBack={fetchProjects}
      createItem={createProjectItem}
      createAddButton={createBlogButton}
    />
  );
};

export { BlogItemList };
