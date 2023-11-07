const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SourceDestinationConnection extends Page {
    /**
     * define selectors using getter methods
     */    
 
    
   async selectDestinationByName (tempName) {
    await $(`//div[contains(text(),"${tempName}")]`).click();
   }

   get continueBtnEle () {
    return $('//span[text()="Continue"]');
   }

}

module.exports = new SourceDestinationConnection();
