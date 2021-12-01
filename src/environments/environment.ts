// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  server: 'http://161.97.65.64:8080/api_gateway_micec/be_micec/',
  serverSecurity: 'http://161.97.65.64:8080/api_gateway_micec/security/',
  hostName: 'http://161.97.65.64:8080/fe_micec/'
};
