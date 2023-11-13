const { $ } =  require("@wdio/globals");
const { request } = require("pactum");


const rudderTestDataSetup = {

    validLoginData() {
        userLogin = {
            "email": global.envVar.QC_LOGIN_EMAIL,
            "password": global.envVar.QC_LOGIN_PWD
        }
        return userLogin
    },
    defaultHeader() {
        header = {
            'Content-Type': 'application/json'
        }
        return header
    },
    setDefaultEndpoint(tempUrl) {
        request.setBaseUrl(tempUrl)
    },
    setAuth() {
        request.setBasicAuth(global.envVar.QC_AUTH_KEY, '')
    },

    invalidLoginReq(email, password) {
        reqBody = {
            "email": email,
            "password": password
        }
        return reqBody
    },

    loginEndpoint() {
        return "/login"
    },

    eventEndpoint(reqTypePath) {
        return (reqTypePath == "identify" ? "/v1/identify" : "/v1/track")
    },

    triggerEventReq() {
        temp = {
            "userId": "sourceDemo",
            "anonymousId": "test",
            "context": {
                "requestBin": {
                    "test": "sample event"
                },
                "library": {
                    "name": "http"
                }
            }
        }
        return temp
    }
}

module.exports = rudderTestDataSetup