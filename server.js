//Express is the server that will be running node
var express = require('express');
//QueryString for parsing querystring - more on https://nodejs.org/api/querystring.html
var qs = require('querystring');
//url is used for parsing url and extract different parts out of it
//https://nodejs.org/api/url.html
var url = require('url');
//bodyParser runs as a middleware between node and json. 
//It helps in parsing json for post requests
var bodyParser = require('body-parser');
//Initializing the express server
var app = express();
//fs is for reading files from disk
var fs = require('fs');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.listen(3000, function() {
    console.log('Server started on port 3000. Access it with http://localhost:3000');
});


app.get('/service/info/getsample.json', function(req, res) {
    res.json({
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "offlineStatus": false,
            "payload": {
                "responseCode": "200",
                "pseReturnCode": null,
                "message": "success",
                "messageId": null,
                "externalFaultCode": null,
                "externalFaultMessaage": null,
                "offline": false,
                "pharmacyClosed": false
            }
        }
    });
});


app.get('/service/info/filesample.json', function(req, res) {
    var data = fs.readFileSync('json/samplefile.json', 'utf8');
    var obj = JSON.parse(data);
    res.json(obj);
});


app.post('/service/info/postsample.json', function(req, res) {
    var data = {
        "StoreResponse": {
            "code": "200",
            "message": "success"
        }
    };
    res.json(data);
});


app.get('/service/info/paramssample/emp/:empId/pin/:empPin', function(req, res) {
    var employeeId = req.params.empId;
    var empPwd = req.params.empPin;
    console.log(employeeId + " " + empPwd);
    if (employeeId == "111111") {
        //Manager Test Data
        res.json({
            "StoreResponse": {
                "code": "200",
                "message": "success",
                "payload": {
                    "validToken": false,
                    "empId": "2014626",
                    "roles": "P",
                    "isValidToken": false
                }
            }
        });
    } else if (employeeId == "222222") {
        //Employee fail test data
        res.json({
            "StoreResponse": {
                "code": "403",
                "message": "failure"
            }
        });
    } else {
        //Else valid employee
        res.json({
            "StoreResponse": {
                "code": "200",
                "message": "success",
                "payload": {
                    "validToken": false,
                    "empId": "2014626",
                    "roles": "T",
                    "isValidToken": false
                }
            }
        });
    }
});


app.post('/service/info/base64imagesample.json', function(req, res) {
    res.json({
        storeResponse: {
            code: "200",
            message: "success",
            payload: {
                base64TIFFEsig: " kj;hdfasdkfnasdfnapsdfanspdsfsafasdfsdfasmdnm9phmdsafmsdoppohdiasofasdpofasdofsjmsdofjasmdfasdfsoadmfasjdfasfsdf "
            }
        }
    });
});