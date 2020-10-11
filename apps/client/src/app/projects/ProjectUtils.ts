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
export {
  updateProjectItem,
  deleteProjectItem,
  addPortfolioItem,
  getPortfolioItem,
};
