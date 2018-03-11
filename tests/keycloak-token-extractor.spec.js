const tap = require('tap');
const nock = require('nock');
const extractorLib = require('../dist');

const mockData = {
  url: 'https://testkeycloak.net',
  realm: 'testrealm'
};

// TODO write tests

// tap.test(`error invalid token`, async t => {
//   nock(`https://testkeycloak.net`)
//     .get('/auth/realms/testrealm/protocol/openid-connect/certs')
//     .replyWithError('Error');
//   const extractorInstance = new extractorLib.KeycloakTokenExtractor(mockData);
//   const mockToken = 'invalid token';
//   t.rejects(
//     extractorInstance.extractToken(mockToken),
//     new Error(`failed to decode token: ${mockToken}`)
//   );
// });
