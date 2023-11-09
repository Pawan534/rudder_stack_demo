const pactum = require('pactum');
const  addSpecHandler  = require('pactum/src/exports/handler');
const { setJsonLikeAdapter } = require('pactum/src/exports/settings');
const handler = pactum.handler


const specCustomHandler = {

    postCustomSpec() {
        handler.addSpecHandler('login user', (ctx) => {
            const { spec, reqBody, url } = ctx;
            console.log("****")
            console.log(ctx);
            console.log("****")
            spec.post("https://api.rudderstack.com/login");
            spec.withBody({
                    "email": "mpavan534@gmail.com",
                    "password": "IndWinWorldCup@123"
            });
        });
    }

}

module.exports = specCustomHandler