import * as jwt from 'express-jwt';
import * as jwksRsa from 'jwks-rsa';

// See https://auth0.com/docs/quickstart/backend/nodejs/01-authorization

/** checkJwt is a middleware that checks if the auth token is valid. */
const checkJwt = jwt({
  // Dynamically provide a signing key based on the [Key ID](https://tools.ietf.org/html/rfc7515#section-4.1.4)
  // header parameter ("kid") and the signing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.NX_AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer
  audience: process.env.NX_AUTH0_AUDIENCE,
  issuer: `https://${process.env.NX_AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

export { checkJwt };
