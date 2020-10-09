import React from 'react';
import { ProjectItem } from '../projects/ProjectItem';
import {
  PortfolioItem,
  PortfolioCategory,
} from '@pure-and-lazy/api-interfaces';
import { ItemList } from '../projects/ItemList';
import { PortfolioAddButton } from '../portfolio-shared/PortfolioAddButton';

const BlogItemList = () => {
  const getUrl = (username: string): string =>
    `/api/portfolio/${username}/all?category=blog`;
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
    return (
      <PortfolioAddButton onAdd={onAdd} category={PortfolioCategory.BLOG} />
    );
  };
  return (
    <ItemList
      fetchUrl={getUrl}
      createItem={createProjectItem}
      createAddButton={createBlogButton}
    />
  );
};

export { BlogItemList };
