const { Given, When, Then, Before } = require('@wdio/cucumber-framework');
const pactum = require('pactum');
const tempData = require('../lib/data/data');
const customMethods = require('../lib/utils/custom-service-utils');

//To re-initialise the spec before execution of scenario
Before(() => {
    spec = pactum.spec();
});


Given(/^I call the rudderstack login service with valid login details$/, async () => {
    // Setting a setBaseUrl
    tempData.setDefaultEndpoint(global.envVar.QC_API_URL);
    // Creating a customPost request
    customMethods.custPostMethod(tempData.loginEndpoint(), tempData.defaultHeader(), tempData.validLoginData());
});

Given(/^I call the rudderstack login service using invalid (.*) and (.*)$/, async (email, password) => {
     // Setting a setBaseUrl
    tempData.setDefaultEndpoint(global.envVar.QC_API_URL);
    // Creating a customPost request
    customMethods.custPostMethod(tempData.loginEndpoint(), tempData.defaultHeader(), tempData.invalidLoginReq(email, password));
});


Given(/^I publish the identify event$/, async() => {
    // Setting a setBaseUrl
    tempData.setDefaultEndpoint(global.envVar.QC_API_RUDDERLABS);
    // Setting a setBasicAuth
    tempData.setAuth();
    customMethods.custPostMethod(tempData.eventEndpoint('identify'), tempData.defaultHeader(), tempData.triggerEventReq());
});

When(/^I want to track the events using service call$/, async() => {
   // Setting a setBaseUrl
   tempData.setDefaultEndpoint(global.envVar.QC_API_RUDDERLABS);
   // Setting a setBasicAuth
   tempData.setAuth();
   customMethods.custPostMethod(tempData.eventEndpoint('track'), tempData.defaultHeader(), tempData.triggerEventReq());
});

When(/^I should see response statusCode as (.*)$/, async (status) => {
    try {
        // Toss will used to execute a http calls and then we get the response
        await spec.toss();
        // Validating the status
        spec.response().should.have.status(parseInt(status));
    } catch (error) { // if response doesn't match it will throw the exception
        throw new Error("Enter valid request", spec.returns('res.body'));
    }
    finally {
        console.log(spec.returns('res.body'));
    }
});

Then(/^I should validate the response body$/, async () => {
    spec.response().should.have.bodyContains(global.envVar.QC_LOGIN_EMAIL);
    spec.response().should.have.bodyContains("success");
});

Then(/^I should validate the response as (.*)$/, async (msg) => {
    spec.response().should.have.bodyContains(msg);
});
