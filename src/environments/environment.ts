// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //APIEndpoint:  'http://tensotap.eastus.cloudapp.azure.com/TensoTapService/api/',
  whitelist: ['localhost:58654', '192.168.213.196:8080', 'tensotap.eastus.cloudapp.azure.com'],
  APIEndpoint: 'http://localhost:58654/api/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
