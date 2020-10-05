import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

// I will remove comments from here before merging to master

export const useAuth0Api = () => {
  const { user, getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  // Auth0 Management API constants
  const auth0Domain = 'pure-and-lazy.au.auth0.com';
  const audience = `https://${auth0Domain}/api/v2/`;
  const userDetailsByIdUrl = `https://${auth0Domain}/api/v2/users/${user.sub}`;

  const getAccessToken = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: audience,
        scope: 'read:current_user update:current_user_metadata',
      });
      console.log('got access token silently');
      return Promise.resolve(accessToken);
    } catch (e) {
      console.log("failed silent attempt", e.message);
      try {
        const accessToken = await getAccessTokenWithPopup({
          audience: audience,
          scope: 'read:current_user update:current_user_metadata',
        });
        console.log('got access token via popup');
        return Promise.resolve(accessToken);
      } catch (e) {
        console.log(e.message);
        return Promise.reject(e);
      }
    }
  }

  const getRegistrationStatus = async () => {
    try {
      const accessToken = await getAccessToken();

      const response = await axios(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('got userData response', response);

      return Promise.resolve(response.data.user_metadata.registration_complete)
    } catch (e) {
      console.log("getRegistrationStatus error", e.message);
      return Promise.reject(e);
    }
  };

  const updateRegistrationStatus = async () => {
    try {
      const accessToken = await getAccessToken();

      const payload = {
        user_metadata: {
          registration_complete: true,
        },
      };

      const response = await axios({
        method: 'PATCH',
        url: userDetailsByIdUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'content-type': 'application/json',
        },
        data: payload,
      });

      console.log('patch response:', response);
    } catch (e) {
      console.log("updateRegistrationStatus error", e.message);
      return Promise.reject(e);
    }
  };

  return {
    getRegistrationStatus,
    updateRegistrationStatus,
  }
}

export default useAuth0Api;
