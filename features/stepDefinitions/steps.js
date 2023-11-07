const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals');
const assert = require('assert')
require('dotenv').config();
global.envVariable = process.env


const LoginPage = require('../pages/login.page');
const ConnectionPage = require('../pages/connection.page')
const SourcePage = require('../pages/source.page');
const WebReuseable = require('./webReusable')

Given(/^I am on the (.*) page$/, async (page) => {
    await LoginPage.open();
    await browser.maximizeWindow();
    
});

When(/^I login with (valid|invalid) details$/, async (message) =>  {
    validLogin = (message === "valid") ? true : false
    console.log("Valid details", validLogin);
    if (await validLogin) {
       await LoginPage.login(envVariable.QC_LOGIN_EMAIL, envVariable.QC_LOGIN_PWD);
    } else {
        await LoginPage.login(envVariable.QC_LOGIN_EMAIL, "test");
    }
});


Then(/^I should see (.*) error on login page$/, async (page) => {
    LoginPage.validateLoginErr(page);
});

Then(/^I should be on (.*) page$/, async (page) => {
    
    if (page === "Connection") {
        await expect(ConnectionPage.pageHeaderEle).toBeExisting();
    } else if (page === "Source") {
        await expect(SourcePage.pageHeaderEle).toBeExisting();
    } else if (page === "Login") {
        await expect(LoginPage.inputEmail).toBeExisting();
    }

});


When(/^I click on (.*) source from the list$/, async (sourceName) => {
    ConnectionPage.clickOnSourceByName(sourceName);
});


Then(/^I will create connection between (.*) and (.*) when there is no connection$/, async (source, destination) => {
    await SourcePage.overviewEle.isDisplayed();
    await SourcePage.overviewEle.click();
    if (await SourcePage.sourceConnectionAddedEle.isDisplayed()) {
        console.log("Connection already exist, so skipping the steps");
    } else {
        await WebReuseable.createNewConnection(source, destination);
    }
});





