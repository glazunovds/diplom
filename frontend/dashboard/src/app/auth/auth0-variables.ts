interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: '38kYWZEnammXWakaZTnBlV8cgEgYuqVK',
  domain: 'glazunov.eu.auth0.com',
  callbackURL: 'http://localhost:3000/'
};
