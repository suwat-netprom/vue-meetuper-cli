const geoip = require('geoip-lite');
// Run 'npm run-script updatedb' to update the data file
const request = require('request');

exports.getMeta = function(req, res) {
  if (process.env.NODE_ENV === 'production') {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip);
    return res.json(geo);
  } else {
    request('https://api.ipify.org?format=json', function (error, response) {
      if (!error && response.statusCode == 200) {
        const ip = JSON.parse(response.body).ip;
        const options = {
          method: 'GET',
          url: `https://ip-geo-location.p.rapidapi.com/ip/${ip}`,
          qs: {format: 'json'},
          headers: {
            'x-rapidapi-key': 'dd04ba4b3bmsh964239e23697a72p1dba4ejsnbba42f7cfc9c',
            'x-rapidapi-host': 'ip-geo-location.p.rapidapi.com',
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
