import React from 'react';
const UserContext = React.createContext({
  username: '',
  email: '',
  name: '',
  dateJoined: undefined,
  description: '',
});
export { UserContext };
