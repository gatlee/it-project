import React from 'react';
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
});
export { UserContext };
