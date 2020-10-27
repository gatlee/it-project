import React from 'react';
// Define AuthContext and its default values
const AuthContext = React.createContext({
  registrationComplete: false,
  isLoaded: false,
});
export { AuthContext };
