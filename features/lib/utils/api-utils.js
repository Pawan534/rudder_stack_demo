
const { Before } = require('@wdio/cucumber-framework');
const pactum = require('pactum');

Before(() => {
    spec = pactum.spec();
});

const response = {

    async postRequest(reqPath, reqHeaders, reqBody, statusCode) {
        const resp = await spec
            .post(reqPath)
            .withHeaders(reqHeaders)
            .withBody(reqBody)
            .returns('res.body')

        try {
            spec.toss();
            spec.response().should.have.status(statusCode)
        } catch (error) {
            throw new Error("Please enter valid request", resp);
        }
        return resp
    },

    async getRequest(reqPath, reqHeaders, statusCode) {

        const resp = await spec
            .get(global.envVar.QC_API_URL + reqPath)
            .returns('res.body')
        try {
            spec.toss();
            spec.response().should.have.status(statusCode)
        } catch (error) {
            throw new Error("Please enter valid request", resp);
        }
        return resp
    }
}

module.exports = response

/*
class ApiUtils {
   async postRequest(reqPath, reqHeaders, reqBody, statusCode) {
       const resp =  await spec
            .post(envVariable.QC_API_URL + reqPath)
            .withHeaders(reqHeaders)
            .withBody(reqBody)
            try {
                spec.toss()
                spec.response().should.have.status(statusCode);
                console.log("Customer entered valid response")
            } catch (error) {
                throw new Error("Please enter valid request", spec.returns('res.body'));
            }
      return resp
    }
}
*/
