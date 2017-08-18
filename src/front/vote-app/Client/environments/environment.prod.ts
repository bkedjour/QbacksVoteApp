export const environment = {
  production: true,
  baseURI : document.baseURI.endsWith('/') ? document.baseURI + 'api/' : `${document.baseURI}/api/`
};
