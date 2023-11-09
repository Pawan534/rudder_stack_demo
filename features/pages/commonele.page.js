const { $ } = require('@wdio/globals');
const Page = require('./page');

class CommonEle extends Page {

    get enable2FABtnEle () {
        return $('//button//span[text()="Enable 2FA"]');
    }

    get laterLink () {
        return $('//a[contains(text(),"ll do this later")]');
    }

    get dashboardBtn () {
        return $('//span[text()="Go to dashboard"]');
    }

}

module.exports = new CommonEle();