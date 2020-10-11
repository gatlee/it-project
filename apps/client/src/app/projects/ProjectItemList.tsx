import {
  PortfolioItem,
  PortfolioCategory,
} from '@pure-and-lazy/api-interfaces';
import React from 'react';
import { ItemList } from './ItemList';
import { ProjectItem } from './ProjectItem';
import { PortfolioAddButton } from '../portfolio-shared/PortfolioAddButton';

const ProjectItemList = () => {
  const getUrl = (username: string): string =>
    `/api/portfolio/${username}/all?category=projects`;

  const createProjectItem = (
    item: PortfolioItem,
    index: React.Key,
    onUpdate: () => void
  ) => (
    <ProjectItem
      id={item._id}
      key={index}
      title={item.name}
      imageUrl={item.image}
      description={item.description}
      content={item.content}
      onUpdate={onUpdate}
    />
  );

  const createProjectButton = (onAdd: () => void) => {
    return (
      <PortfolioAddButton onAdd={onAdd} category={PortfolioCategory.PROJECTS} />
    );
  };

  return (
    <ItemList
      fetchUrl={getUrl}
      createItem={createProjectItem}
      createAddButton={createProjectButton}
    />
  );
};

export { ProjectItemList };
