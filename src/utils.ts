/**
 * Parse token string from header
 * @param header Auth header string
 * @param prefix Auth header prefix string, default "bearer" (case sensitive)
 */
export function parseAuthHeader(header: string, prefix = 'bearer') {
  const prefixLength = prefix.length;
  const headerPrefix = header.substr(0, prefixLength);
  if (prefix === headerPrefix) {
    return header.substr(prefixLength);
  } else {
    throw new Error(
      `invalid stard header string, expect ${prefix}, got ${headerPrefix}`
    );
  }
}

export function extractClientRoles() {}
