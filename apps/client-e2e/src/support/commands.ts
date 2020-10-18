/* eslint-disable */

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable<Subject> {
    login(email: string, password: string): void;
  }
}
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import jwt_decode from 'jwt-decode';

Cypress.Commands.add('authenticate', () => {
  const client_id = Cypress.env('auth_client_id');
  const client_secret = Cypress.env('auth_client_secret');
  const username = Cypress.env('auth_username');
  const password = Cypress.env('auth_password');
  const token_type = 'Bearer';

  const generateToken = (audience, scope, generateCookies) => {
    const options = {
      method: 'POST',
      url: Cypress.env('auth_url'),
      body: {
        grant_type: 'password',
        username,
        password,
        audience,
        scope,
        client_id,
        client_secret,
      },
    };

    cy.request(options).then(({ body }) => {
      const { access_token, expires_in, id_token } = body;
      const key = `@@auth0spajs@@::${client_id}::${audience}::${scope}`;

      const [header, payload, signature] = id_token.split('.');
      const tokenData = jwt_decode(id_token);

      if (generateCookies) {
        cy.setCookie('auth0.is.authenticated', 'true');
        cy.setCookie('userRegistered', id_token);
      }

      window.localStorage.setItem(
        key,
        JSON.stringify({
          body: {
            access_token,
            id_token,
            scope,
            expires_in,
            token_type,
            decodedToken: {
              encoded: { header, payload, signature },
              header: {
                alg: 'RS256',
                typ: 'JWT',
              },
              claims: {
                __raw: payload,
                ...tokenData,
              },
              user: tokenData,
            },
            audience,
            client_id,
          },
          expiresAt: Math.floor(Date.now() / 1000) + expires_in,
        })
      );
    });
  };

  generateToken(
    Cypress.env('auth_auth_url'),
    'openid profile email offline_access',
    true
  );
  generateToken(
    Cypress.env('auth_api_url'),
    'openid profile email offline_access read:current_user update:current_user_metadata',
    false
  );
});

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorageCache', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorageCache', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});
