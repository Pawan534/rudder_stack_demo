const SourcePage = require('../pages/source.page');
const SourceDestinationConnection = require('../pages/sourceDestinationConnection.page');
const CommonEle = require('../pages/commonele.page');
const Destination =  require('../pages/destination.page')

class WebReuseable {

    async createNewConnection (source, destination) {


        //hover the element
        await SourcePage.addDestinatonEle.click();

        //now click on Exising destination element
        await SourcePage.existingDestinationEle.click();
        await new Promise(r => setTimeout(r, 50));

        //now select the destination
        await SourceDestinationConnection.selectDestinationByName(destination);
        await new Promise(r => setTimeout(r, 200));

        //now click on continue button
        await SourceDestinationConnection.continueBtnEle.click();
        await new Promise(r => setTimeout(r, 500));

        
        //again click on continue button
        await SourcePage.continueBtnEle.click();
        await new Promise(r => setTimeout(r, 4000));

        //waiting untill btnLoading disable
        await SourcePage.btnLoaderEle.waitForDisplayed({ reverse: true })

        await SourcePage.verifySrcAndDesConnected("Source connected to destination successfully", destination);
    }

    async skip2FABtn () {
        await CommonEle.laterLink.click()
        await new Promise(r => setTimeout(r, 50));

        await CommonEle.dashboardBtn.click();
        await new Promise(r => setTimeout(r, 50));
    }

    async naviageteToDestinationEventPage (destination) {
        await $('//a[text()="Destinations"]').click();
        await browser.pause(500);
        await Destination.destinationPageEle.isDisplayed();
        await Destination.clickOnDestination(destination)
        await Destination.clickOnEventsTab();
        await browser.pause(1000);
    }

}

module.exports = new WebReuseable();