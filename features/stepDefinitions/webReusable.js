const SourcePage = require('../pages/source.page');
const SourceDestinationConnection = require('../pages/sourceDestinationConnection.page');

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

}

module.exports = new WebReuseable();