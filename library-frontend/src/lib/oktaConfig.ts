export const oktaConfig = {
  clientId: `0oaaso4m4xQhsC9O95d7`,
  issuer: 'https://dev-06370613.okta.com/oauth2/default',
  redirectUri: 'https://localhost:3000/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  disableHttpsCheck: true,
};
  