import { UserTheme } from '@pure-and-lazy/api-interfaces';

const updateProfilePicture = async (
  profilePicture: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>
) => {
  return updateProfile(getAccessTokenSilently, {
    profilePicture: profilePicture,
  });
};

const updateName = async (
  theme: UserTheme,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>
) => {
  return updateProfile(getAccessTokenSilently, {
    theme: theme,
  });
};

const updateTheme = async (
  name: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>
) => {
  return updateProfile(getAccessTokenSilently, {
    name: name,
  });
};

// Not Exported
const updateProfile = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>,
  newProfile // NOTE: There's no interface for this right?
) => {
  let token: string;
  try {
    token = await getAccessTokenSilently();
  } catch (error) {
    return Promise.reject('Failed to get access token');
  }

  const body = {
    ...newProfile,
  };

  return fetch('/api/portfolio/profile', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

export { updateProfilePicture, updateName, updateTheme };
