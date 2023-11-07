const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputEmail () {
        return $('#text-input-email');
    }

    get inputPassword () {
        return $('#text-input-password');
    }

    get loginBtn () {
        return $('//button//span[text()="Log in"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        await this.inputEmail.setValue(username);
        await this.inputPassword.setValue(password);
        await this.loginBtn.click();
    }

    async validateLoginErr (tempName) {
       await $(`//div[text()="${tempName}"]`).isDisplayed();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('login');
    }
}

module.exports = new LoginPage();
