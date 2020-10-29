import React from 'react';
const UserContext = React.createContext({
  username: '',
  email: '',
  name: '',
  dateJoined: undefined,
  profilePicture: '',
  description: '',
  setProfilePicture: (profilePicture) => null,
  setName: (name) => null,
});
export { UserContext };
