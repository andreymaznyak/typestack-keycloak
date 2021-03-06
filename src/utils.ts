/**
 * Parse token string from header
 * @param header Auth header string
 * @param prefix Auth header prefix string, default "bearer" (case sensitive)
 */
export function parseAuthHeader(
  header: string,
  prefixes = ['bearer ', 'Bearer ']
) {
  const foundPrefix = prefixes.find(prefix => header.startsWith(prefix));
  if (!!foundPrefix) {
    const token = header.substr(foundPrefix.length);
    return token;
  } else {
    throw new Error(
      `invalid stard header string, expect ${prefixes}..., got ${header.substr(
        10
      )}`
    );
  }
}

export function extractClientRoles() {}
