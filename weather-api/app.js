const express = require('express');
const busboy = require('connect-busboy');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());

app.use(bodyParser.json({
    limit: '1000mb',
    extended: true
}));
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true, parameterLimit: 50000 }));

app.use(busboy({
    highWaterMark: 2 * 1024 * 1024,
    immediate: true
}));

app.get('/test', function(req, res) {
    var resp = 'test';
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(JSON.stringify(resp));
});
app.get('/location', function(req, res) {
    getLocationInfo(req, res);
})

app.get('/woeid', function(req, res) {
    getWeatherInfo(req, res);
})

function getLocationInfo(request, response, context) {
    console.log("reached here 1");
    var resp = 'test333';
    let locationInfo = request.query.locationInfo;
    console.log("location Info ", locationInfo);
    const encodedUrl = encodeURI(locationInfo);
    const agent = new https.Agent({
        rejectUnauthorized: false
    })
    const findLocationInfo = async() => {
        try {
            let axiosRes = axios.get('https://www.metaweather.com/api/location/search/?query=' + encodedUrl, { httpsAgent: agent });
            return axiosRes;
        } catch (error) {
            console.log("reached get error ", error);
        }
    }
    findLocationInfo().then(resp => {
        if (resp && resp.status == 200) {
            let respData = resp.data;
            response.writeHead(200, { 'Content-type': 'application/json' });
            response.end(JSON.stringify(respData));
        } else {
            response.writeHead(200, { 'Content-type': 'application/json' });
            response.end(JSON.stringify("Error"));
        }
    })

}

function getWeatherInfo(request, response, context) {

    let woeidInfo = request.query.woeid;
    const encodedUrl = encodeURI(woeidInfo);
    const agent = new https.Agent({
        rejectUnauthorized: false
    })
    const findTempInfo = async() => {
        try {
            let axiosRes = axios.get('https://www.metaweather.com/api/location/' + encodedUrl, { httpsAgent: agent });
            return axiosRes;
        } catch (error) {
            console.log("reached get error ", error);
        }
    }
    findTempInfo().then(resp => {
        if (resp && resp.status == 200) {
            let respData = resp.data;
            response.writeHead(200, { 'Content-type': 'application/json' });
            response.end(JSON.stringify(respData));
        } else {
            response.writeHead(200, { 'Content-type': 'application/json' });
            response.end(JSON.stringify("Error "));
        }
    })

}
const https = require('https');
const port = 4001;
app.listen(port, () => {
    console.log("server starting");
})