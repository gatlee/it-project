// Functions which manage API requests about projects
//
// useAuth0 hook must be passed in since it can't be called outside of a
//

// Update the title and description of a project item with the given id
const updateProjectItem = async (
  title: string,
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
    console.log('Unable to get token');
    token = '';
  }
  const data = {
    type: 'TextItem',
    _id: id,
    name: title,
    description: description,
    content: content,
    __v: 0,
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

// Delete the projectItem
const deleteProjectItem = async (
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>
) => {
  let token: string;
  try {
    token = await getAccessTokenSilently();
  } catch (error) {
    token = '';
  }

  await fetch(`/api/portfolio/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { updateProjectItem, deleteProjectItem };
