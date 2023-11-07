# rudder_stack_demo
- SDET Assignment
- This demo project build on Windows machine


## WebdriverIO-Cucumber Framework with BDD (Cucumber)
- This is WebdriverIO (Node.js/JavaScript)
- Using the Cucumber BDD framework
- It will generate Cucumber html report and JSON reports

### Installation
- This project is tested on Node v20.90.0 
- Clone the directory and run

### Run example tests
```
npm install
npm run test
```
### Using feature name 
To run feature file using tag
```
npx wdio --web
npx wdio --api

```

### Using Tages 
To run feature file using feature file name
```
npx wdio --spec .\features\feature-files\rudder-stack-login.feature

npx wdio --spec .\features\feature-files\rudder-api-login.feature

```
### Features

> * Page Object Model
> * Env
> * JSON Reports
> * Cucumber Html Reports
> * API Calls using Pactum

### Cucumber HTML Report:
