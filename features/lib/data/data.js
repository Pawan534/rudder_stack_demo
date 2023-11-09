require('dotenv').config();
envVariable = process.env
const { request } = require("pactum");


const rudderTestDataSetup = {

    validLoginData() {
        userLogin = {
            "email": envVariable.QC_LOGIN_EMAIL,
            "password": envVariable.QC_LOGIN_PWD
        }
        console.log(userLogin);
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

    reqHeader() {
        header = {
            'Content-Type': 'application/json'
        }
        return header
    },

    setAuth() {
        request.setBasicAuth(envVariable.QC_AUTH_KEY, '')
    },

    invalidLoginReq(page) {
        reqBody = {
            "email": (page === "email") ? "test@test.com" : ((page === "empty email") ? "" : envVariable.QC_LOGIN_EMAIL),
            "password": (page === "password") ? "test1234" : ((page === "empty password") ? "" : envVariable.QC_LOGIN_PWD)
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