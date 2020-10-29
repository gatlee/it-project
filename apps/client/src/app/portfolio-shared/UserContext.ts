import React from 'react';
import { UserTheme } from '@pure-and-lazy/api-interfaces';
const UserContext = React.createContext({
  username: '',
  email: '',
  name: '',
  dateJoined: undefined,
  profilePicture: '',
  description: '',
  setProfilePicture: (profilePicture) => null,
  setDescription: (description) => null,
  setName: (name) => null,
  theme: UserTheme.DEFAULT,
});
export { UserContext };
