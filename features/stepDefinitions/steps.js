const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $, $$ } = require('@wdio/globals');



const LoginPage = require('../pages/login.page');
const ConnectionPage = require('../pages/connection.page');
const SourcePage = require('../pages/source.page');
const WebReuseable = require('./webReusable');
const CommonEle = require('../pages/commonele.page');
const Destination = require('../pages/destination.page')

Given(/^I login with (valid|invalid) (.*) and (.*) details$/, async (loginType, tempEmail, tempPassword) =>  {
    // Initiating a browser and maximising the browser
    await LoginPage.open();
    await browser.maximizeWindow();

    // Trying to login on webpage with valid and invalid details
    email = (loginType === "valid") ? global.envVar.QC_LOGIN_EMAIL : tempEmail
    password = (loginType === "valid") ? global.envVar.QC_LOGIN_PWD : tempPassword
    await LoginPage.login(email, password);
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
    }  else if (page === "Destination") {
        expect(Destination.destinationPageEle).toBeDisplayed();
    }

});


When(/^I click on (.*) source from the list$/, async (sourceName) => {
    ConnectionPage.clickOnSourceByName(sourceName);
});

When(/^I skip Add an extra layer of security page$/, async () => {
    await browser.pause(9000);
    if (await CommonEle.enable2FABtnEle.isDisplayed()){
       await WebReuseable.skip2FABtn();
    }
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

When(/^I pause the browse page$/, async () => {
    await browser.pause(3000);
});

When(/^I click on Destinations link$/, async () => {
    await $('//a[text()="Destinations"]').click();
});

When(/^I naviagete to (.*) destination events page$/, async (destination) => {
    await WebReuseable.naviageteToDestinationEventPage(destination);
});

Then(/^I should valid the (Delivered|Failed) count for destination events$/, async (countType) => {
    const eventCount = await Destination.getDeliveryFailedCount(`${countType}`);
    global.wdioAssert(parseInt(eventCount)>=0, `Event count for ${countType} not displayed as expected`)
    console.log(`${countType} Count is `, eventCount)
});





