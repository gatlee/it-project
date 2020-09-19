import * as jwt from 'express-jwt';
import * as jwksRsa from 'jwks-rsa';
import { UserModel } from './models/user';

// See https://auth0.com/docs/quickstart/backend/nodejs/01-authorization
const auth0Domain = 'pure-and-lazy.au.auth0.com';
const auth0ApiIdentifier = 'https://pure-and-lazy-backend';

/** checkJwt is a middleware that checks if the auth token is valid. */
const checkJwt = jwt({
  // Dynamically provide a signing key based on the [Key ID](https://tools.ietf.org/html/rfc7515#section-4.1.4)
  // header parameter ("kid") and the signing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${auth0Domain}/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer
  audience: auth0ApiIdentifier,
  issuer: `https://${auth0Domain}/`,
  algorithms: ['RS256'],
});

export { checkJwt };
