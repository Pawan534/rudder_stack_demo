const { Given, When, Then, Before } = require('@wdio/cucumber-framework');
const { $ } = require('@wdio/globals');
const pactum = require('pactum');

require('dotenv').config();
global.envVariable = process.env

Before(() => {
    spec = pactum.spec();
});

Given(/^I call the rudderstack login service with valid login details$/, async () => {
     spec
        .post('/login')
        .withHeaders('Content-Type', 'application/json')
        .withBody({
            "email": envVariable.QC_LOGIN_EMAIL,
            "password": envVariable.QC_LOGIN_PWD
        })
});

Given(/^I call the rudderstack login service using invalid (.*)$/, async (page) => {
    spec
       .post('/login')
       .withHeaders('Content-Type', 'application/json')
       .withBody({
           "email": (page === "email") ? "test@test.com" : ((page === "empty email") ? "": envVariable.QC_LOGIN_EMAIL),
           "password": (page === "password") ? "test1234" : ((page === "empty password") ? "": envVariable.QC_LOGIN_PWD),
       })
});

When(/^I call the rudderstack login service with invalid login details$/, async () => {
    spec
       .post('/login')
       .withHeaders('Content-Type', 'application/json')
       .withBody({
           "email": "test@gmail.com",
           "password": envVariable.QC_LOGIN_PWD
       })
});


Then(/^I should see response statusCode as (.*)$/, async (status) => {
    await spec.toss();
    spec.response().should.have.status(parseInt(status))
});

Then(/^I should validate the response body$/, async()  => {
 
    spec.response().should.have.bodyContains(envVariable.QC_LOGIN_EMAIL);
    spec.response().should.have.bodyContains("success");
    spec.stores("authToken", 'accessToken');
});

Then(/^I should validate the response as (.*)$/, async(msg)  => {
    spec.response().should.have.bodyContains(msg);
});



