const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class Source extends Page {
    /**
     * define selectors using getter methods
     */

    get noSourceDesConnection () {
        return $('//div[contains(@class,"source-destinations_noDestinationsContainer")]');
    }

    get pageHeaderEle () {
        return $('//span[text()="HTTP"]');
    }
    
    get addDestinatonEle () {
        return $('//button/span[contains(text(),"Add Destination")]');
    }

    get existingDestinationEle () {
        return $('//ul/li/span[contains(text(),"Use Existing Destination")]')
    }

    get overviewEle () {
        return $('//div[text()="Overview"]');
    }

    get sourceConnectionAddedEle () {
        return $('//div[@id="members-table"]//th[text()="Destination"]/../../..//div[text()="Enabled"]');
    }

    get newDestinationEle () {
        return $('//ul/li/span[contains(text(),"Create New Destination")]');
    }

    get sourceDistHeader () {
        return $('//div[contains(@class,"source-destinations_header")]');
    }

    async verifySrcAndDesConnected (tempName, destination) {
       if (await $('//div[@class="ant-notification-notice-message"]').isDisplayed()){
            await $(`//div[text()='${tempName}']`).isDisplayed();
       } else {
        await $(`//tbody//div[text()="${destination}"]`).isDisplayed();
        sourceConnectionAddedEle.isDisplayed();
       }
    }

    async verifyDestinationCnt (tempName) {
        await $(`//div[text()='${tempName}']`).waitForDisplayed();
     }


    get continueBtnEle () {
        return $('//span[text()="Continue"]');
    }

    get btnLoaderEle () {
        return $('//span[@class="ant-btn-loading-icon"]');
    }
    
}

module.exports = new Source();
