import { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Cookies from 'js-cookie';
import axios from 'axios';

export const useAuth0Api = () => {
  const {
    isAuthenticated,
    user,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
  } = useAuth0();

  // Auth0 Management API constants
  const auth0Domain = 'pure-and-lazy.au.auth0.com';
  const audience = `https://${auth0Domain}/api/v2/`;
  const userDetailsByIdUrl = isAuthenticated
    ? `https://${auth0Domain}/api/v2/users/${user.sub}`
    : '';
  // functions that rely on userDetailsByIdUrl should not be called is auth0 is not authenticated

  const getAccessToken = useCallback(async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: audience,
        scope: 'read:current_user update:current_user_metadata',
      });
      return Promise.resolve(accessToken);
    } catch (e) {
      // Fallback to retrieving access token with consent form popup
      try {
        const accessToken = await getAccessTokenWithPopup({
          audience: audience,
          scope: 'read:current_user update:current_user_metadata',
        });
        return Promise.resolve(accessToken);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  }, [audience, getAccessTokenSilently, getAccessTokenWithPopup]);

  const getRegistrationStatus = useCallback(async (): Promise<boolean> => {
    try {
      const accessToken = await getAccessToken();

      const response = await axios({
        method: 'GET',
        url: userDetailsByIdUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return Promise.resolve(response.data.user_metadata.registration_complete);
    } catch (e) {
      return Promise.reject(e);
    }
  }, [getAccessToken, userDetailsByIdUrl]);

  const getRegistrationStatusWithCache = useCallback(async () => {
    try {
      const accessToken = await getAccessToken();

      if (Cookies.get('userRegistered') === accessToken) {
        return Promise.resolve(true);
      }
      const registrationCompleted = await getRegistrationStatus();

      if (registrationCompleted) {
        // We only want the cache to apply to the current user
        Cookies.set('userRegistered', accessToken);
      }

      return Promise.resolve(registrationCompleted);
    } catch (e) {
      return Promise.reject(e);
    }
  }, [getAccessToken, getRegistrationStatus]);

  // Update Auth0 user data to indicate that registration is complete
  const updateRegistrationStatus = async () => {
    try {
      const accessToken = await getAccessToken();

      const updatedData = {
        // eslint-disable-next-line @typescript-eslint/camelcase
        user_metadata: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          registration_complete: true,
        },
      };

      await axios({
        method: 'PATCH',
        url: userDetailsByIdUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'content-type': 'application/json',
        },
        data: updatedData,
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return {
    updateRegistrationStatus,
    getRegistrationStatusWithCache,
  };
};

export default useAuth0Api;
