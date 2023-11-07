const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ConnectionPage extends Page {
    
    /**
     * define selectors using getter methods
     */
    get pageHeaderEle () {
        return $('//h3[text()="Connections"]');
    }

    get sourceListEles () {
        return $('//div[@id="sources-list"]//div[@class="p-t-md"]/div');
    }

    get destinationListEles () {
        return $('//div[@id="destinations-list"]//div[@class="p-t-md"]/div');
    }


    async clickOnSourceByName (tempName) {
        // this.sourceListEleByName(tempName).click();
        await $(`//span[text()="${tempName}"]`).isDisplayed();
        await $(`//span[text()="${tempName}"]`).click();
    }
  
    async destinationListEleByName (tempName) {
        return $(`//div[@id="destinations-list"]//div[@class="p-t-md"]/div//span[text()="${tempName}"]`);
    }   

}

module.exports = new ConnectionPage();
