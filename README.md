# McecFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Customized local environments
By default, `ng serve` uses properties from `environments/environments.ts`. 
If you need to connect to another backend API (i.e. your local API), *avoid overriding properties or duplicating and commenting one*, instead:
1. Create a new environment file, like `environments/environments.myenv.ts`, and set your corresponding values to the properties.
2. Modify `.angular-cli.json` file: add a new property in "environments" section: `"myenv" :"environments/environment.myenv.ts"`
3. Run `ng serve --env=myenv`. 

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
