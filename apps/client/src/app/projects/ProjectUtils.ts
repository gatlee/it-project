import {
  PortfolioCategory,
  PortfolioItem,
} from '@pure-and-lazy/api-interfaces';
// Functions which manage API requests about projects
//
// getAccessTokenSilently hook must be passed in since it can't be called
// outside of a functional component

// Update the title and description of a project item with the given id
const updateProjectItem = async (
  title: string,
  image: string,
  description: string,
  content: string,
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>
) => {
  let token: string;
  try {
    token = await getAccessTokenSilently();
  } catch (error) {
    return Promise.reject('Failed to get access token');
  }
  const data: PortfolioItem = {
    name: title,
    image: image,
    description: description,
    content: content,
    category: PortfolioCategory.PROJECTS,
  };

  return fetch(`/api/portfolio/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

// Delete the projectItem specified by id
const deleteProjectItem = async (
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>
) => {
  let token: string;
  try {
    token = await getAccessTokenSilently();
  } catch (error) {
    return Promise.reject('Failed to get access token');
  }

  return fetch(`/api/portfolio/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Create new project
const addPortfolioItem = async (
  title: string,
  image: string,
  description: string,
  content: string,
  category: PortfolioCategory,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>
) => {
  const body: PortfolioItem = {
    name: title,
    image: image,
    description: description,
    content: content,
    category: category,
  };

  let token: string;
  try {
    token = await getAccessTokenSilently();
  } catch (error) {
    return Promise.reject('Failed to get access token');
  }

  return fetch(`/api/portfolio/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

const getPortfolioItem = async (contentID: string): Promise<PortfolioItem> => {
  return fetch(`/api/portfolio/${contentID}`)
    .then((res) => res.json())
    .then((obj) => {
      obj.created = new Date(Date.parse(obj.created));
      obj.lastModified = new Date(Date.parse(obj.lastModified));
      return obj;
    });
};

const getPortfolioItems = async (
  username: string,
  category: PortfolioCategory
): Promise<Array<PortfolioItem>> => {
  const categoryFilter =
    category === PortfolioCategory.BLOG ? 'blog' : 'projects';
  return fetch(
    `/api/portfolio/${username}/all?category=${categoryFilter}`
  ).then((r) => r.json());
};

// This is like calling getPortfolioItems on the logged in user except you can see private items
const getOwnPortfolioItems = async (
  category: PortfolioCategory,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>
): Promise<Array<PortfolioItem>> => {
  const categoryFilter =
    category === PortfolioCategory.BLOG ? 'blog' : 'projects';

  let token: string;
  try {
    token = await getAccessTokenSilently();
  } catch (error) {
    return Promise.reject('Failed to get access token');
  }

  return fetch(`/api/portfolio/all?category=${categoryFilter}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then((r) => r.json());
};

export {
  updateProjectItem,
  deleteProjectItem,
  addPortfolioItem,
  getPortfolioItem,
  getPortfolioItems,
  getOwnPortfolioItems,
};
