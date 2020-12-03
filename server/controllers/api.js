const geoip = require('geoip-lite');
// Run 'npm run-script updatedb' to update the data file
const request = require('request');

require('dotenv').config();

exports.getMeta = function(req, res) {
  if (process.env.NODE_ENV === 'production') {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip);
    return res.json(geo);
  } else {

    // data for test
   /* const dummy = {
      "data": {
        "area": {
          "code": "TH-10",
          "geonameid": 1609348,
          "name": "Bangkok"
        },
        "asn": {
          "number": 131445,
          "organisation": "Advance Wireless Network"
        },
        "city": {
          "geonameid": 1609350,
          "name": "Bangkok",
          "population": 5104476
        },
        "continent": {
          "code": "AS",
          "geonameid": 6255147,
          "name": "Asia"
        },
        "country": {
          "area_size": "514000.00 sq. km",
          "capital": "Bangkok",
          "code": "TH",
          "flag": {
            "emoji": "🇹🇭",
            "file": "http://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_Thailand.svg",
            "unicode": "U+1F1F9 U+1F1ED"
          },
          "geonameid": 1605651,
          "is_in_eu": false,
          "languages": {
            "en": "English",
            "th": "Thai"
          },
          "name": "Thailand",
          "phone_code": "66",
          "population": 69428524
        },
        "currency": {
          "code": "THB",
          "name": "Baht"
        },
        "ip": "182.232.179.1",
        "location": {
          "latitude": 13.7083,
          "longitude": 100.4562
        },
        "postcode": "10110",
        "security": {
          "is_crawler": false,
          "is_proxy": false,
          "is_thread": false,
          "is_tor": false
        },
        "status": "success",
        "time": {
          "gtm_offset": 25200,
          "time": "2020-12-02 09:00:28 +0700",
          "timezone": "Asia/Bangkok"
        },
        "type": "IPv4"
      },
      "status": 200,
      "statusText": "OK",
      "headers": {
        "connection": "close",
        "content-length": "940",
        "content-type": "application/json; charset=utf-8",
        "date": "Wed, 02 Dec 2020 04:18:38 GMT",
        "etag": "W/\"3ac-rH+PyKUntnfVeKHPZbM/Ub1aa8c\"",
        "x-powered-by": "Express"
      },
      "config": {
        "transformRequest": {},
        "transformResponse": {},
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "headers": {
          "Accept": "application/json, text/plain, *!/!*"
        },
        "method": "get",
        "url": "/api/v1"
      },
      "request": {}
    }
    res.json(dummy);*/

    request('https://api.ipify.org?format=json', function (error, response) {
      if (!error && response.statusCode == 200) {
        const ip = JSON.parse(response.body).ip;
        const options = {
          method: 'GET',
          url: `https://ip-geo-location.p.rapidapi.com/ip/${ip}`,
          qs: {format: 'json'},
          headers: {
            'x-rapidapi-key': process.env.XRAPIDAPIKEY || '',
            'x-rapidapi-host': process.env.XRAPIDAPIHOST || '',
            useQueryString: true
          }
        };
        request(options, function(error, response, body) {
          const geo = JSON.parse(body);
          return res.json(geo);
        });
      } else {
        return res.send(422).send({errors: 'Cannot get location from IP'})
      }
    })
  }
}
