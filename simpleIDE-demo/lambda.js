
let Swagger = require('swagger-client');

exports.handler = function (event, context, callback) {

    Swagger.http({
        url: 'https://services.apixplatform.com/api-sandbox/application/token',
        method: 'post',
        query: {},
        headers: { "Accept": "*/*", "Content-Type": "application/json" },
        body: JSON.stringify({
            "userName": "Mmbank1@apixdemo.com",
            "password": "Passw0rd@"
        })
    }).then((response) => {
        var access_token = "bearer " + response.body.access_token;
        // var firstname = event.firstName;
        // var lastname = event.lastName;
        // console.log("Hello " + ' ' + firstname + ' ' + lastname + '!!');
        Swagger.http({
            url: `https://api.apixplatform.com/sbaccount/1.0/account/accounts/accounts`,
            method: 'get',
            query: { "page": "10", "size": "10" },
            headers: { "X-Authorization": access_token, "Accept": "*/*" }
        }).then((response) => {
            callback(null, response.body);

        }).catch((err) => {
            // error handling goes here
            console.log(err)
        });
        callback(null, access_token);
    }).catch((err) => {
        console.log(err);
        callback("Execution failed");
    });

}