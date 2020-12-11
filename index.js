var fs = require('fs');

const express = require('express')
const app = express()
const port = 3000

function log(payload) {
  var originalUrl = payload.originalUrl.replace(/[^\w\s]/gi, '_')

  fs.appendFile(`log/${payload.hostname}-${originalUrl}-${payload.method}-${new Date().getTime()}.json`, JSON.stringify(payload, null, 2), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

app.all('/*', (req, res) => {
  const {
    headers,
    baseUrl, body, cookies, fresh,
    hostname, ip, ips, method,
    originalUrl, params, path, protocol, 
    query, route, secure, signedCookies,
    stale, subdomains, xhr
  } = req;
  const payload = {
    headers,
    baseUrl,
    body,
    cookies,
    // fresh,
    hostname,
    // ip,
    // ips,
    method,
    originalUrl,
    params,
    path,
    protocol,
    query,
    // secure,
    signedCookies,
    // stale,
    // subdomains,
    // xhr
  };

  log(payload);

  return res.json(payload);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})