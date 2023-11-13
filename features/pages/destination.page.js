const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class Destination extends Page {
    /**
     * define selectors using getter methods
     */
    get destinationPageEle () {
        return $('//span[text()="destinationDemo"]');
    }

    async clickOnDestination (name) {
        await $(`//td//div[text()="${name}"]`).click()
    }

    async clickOnEventsTab () {
        (await $(`div[data-node-key="Events"]`)).click()
    }

    async getDeliveryFailedCount (countType) {
       await $(`//div[text()="${countType}"]/..//span`).isDisplayed()
       return await $(`//div[text()="${countType}"]/..//span`).getText()
    }

 
}

module.exports = new Destination();
