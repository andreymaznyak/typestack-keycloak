import { Agent } from 'https';

import { TokenExtractor } from './models';

const KeyCloakCerts = require('get-keycloak-public-key-with-agent');
const jwt = require('jsonwebtoken');

/**
 * Options for lib 'get-keycloak-public-key-with-agent'
 * @link https://github.com/andreymaznyak/node-get-keycloak-public-key
 */
export interface KeycloakCetsOptions {
  baseUrl: string;
  realm: string;
  proxyAgent?: Agent;
  expire?: number;
}

export interface ExtractorOptions {
  keycloakCetsOptions: KeycloakCetsOptions;
}
/**
 * Class for decode and verify keycloak jwt tokens
 * class have keycloak certs instanse
 */
export class KeycloakTokenExtractor implements TokenExtractor {
  private keyCloakCertsInstance: any;
  constructor(options: ExtractorOptions) {
    this.setKeycloakCets(options.keycloakCetsOptions);
  }
  /**
   * Method return token certs instance
   */
  getKeycloakCets() {
    return this.keyCloakCertsInstance;
  }
  /**
   * Method recreate token certs instance from options
   * @param options token certs lib options
   */
  setKeycloakCets(options: KeycloakCetsOptions) {
    this.keyCloakCertsInstance = new KeyCloakCerts(...Object.values(options));
  }
  /**
   * Method decode token from string, and verify it with public keycloak key
   * @param token
   */
  async extractToken(token: string) {
    const decodedToken = jwt.decode(token, { complete: true });
    if (decodedToken) {
      // decode the token without verification to have the kid value
      return await this.verifyToken(token, decodedToken.header.kid);
    } else {
      throw new Error(`failed to decode token: ${token}`);
    }
  }
  /**
   * Method fetch keycloak public key and verify jwt token
   * @param kid keycloak public key id
   * @param token keycloak jwt token string
   */
  async verifyToken(token: string, kid: string) {
    // fetch the PEM Public Key
    try {
      const publicKey = await this.keyCloakCertsInstance.fetch(kid);
      if (publicKey) {
        return jwt.verify(token, publicKey);
      } else {
        // KeyCloak has no Public Key for the specified KID
        throw new Error(
          `KeyCloak has no Public Key for the specified KID: ${kid} `
        );
      }
    } catch (e) {
      throw e;
    }
  }
}
