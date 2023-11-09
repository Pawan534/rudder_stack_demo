
const customServiceMethods = {

    custPostMethod(url, headers, reqBody){
        spec
        .post(url)
        .withHeaders(headers)
        .withBody(reqBody)
        .returns('res.body')
    }

}

module.exports = customServiceMethods