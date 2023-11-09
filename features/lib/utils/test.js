const pactum = require("pactum")
const spec = pactum.spec
const { ProxyAgent } = require('proxy-agent');

const agent = new ProxyAgent();


const testMethod = {

    async testHttps() {
        await spec()
            .post("https://rudderstacwnbe.dataplane.rudderstack.com/v1/identify")
            .withAuth('2XudX2nChY45Iw6OnmCMNsZG7Sh', '')
            .withJson({
                "userId": "sourceDemo",
                "anonymousId": "test",
                "context": {
                    "requestBin": {
                        "test": "sample event"
                    }
                }
            })
            .expectStatus(200);
    }
}

module.exports = testMethod
testMethod.testHttps()
