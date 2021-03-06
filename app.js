const express = require('express');
const bodyParser = require('body-parser');

const resourceLink = require('./lib/resource-link');

const disksApi = require('./disks-api');

const app = express();
app.use(bodyParser.json());

app.use(express.static('build'));

app.get('/api/v1', (req, res) => {
  res.send({
    links: [
      {
        rel: 'disks',
        href: resourceLink(req, disksApi.ROUTE),
      },
    ],
  });
});

app.use(disksApi.ROUTE, disksApi);

module.exports = app;
