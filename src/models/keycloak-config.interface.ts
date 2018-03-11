export interface KeycloakConfigInterface {
  realm: string;
  baseUrl: string;
  expire: number; // Время кеширования открытого ключа
  debugAccessToken: {
    enabled: boolean;
    skipVerifyHeaderKey: string;
    skipVerifyHeaderValue: string;
  };
}
