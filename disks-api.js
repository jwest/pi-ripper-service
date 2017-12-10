const express = require('express');
const uuidv4 = require('uuid/v4');

const store = require('./lib/store');
const resourceLink = require('./lib/resource-link');

const router = express.Router();

const ROUTE = '/api/v1/disks';

router.get('/', (req, res) => {
  store.getAll('disks').then((disks) => {
    res.send(disks);
  });
});

router.post('/', (req, res) => {
  const id = uuidv4();
  const { body } = req;
  body.id = id;
  store.put('disks', id, body).then(() => {
    res.append('Location', resourceLink(req, `${ROUTE}/${id}`));
    res.send(body);
  });
});

router.get('/:id', (req, res) => {
  store.get('disks', req.params.id)
    .then(disk => res.send(disk))
    .catch(() => res.sendStatus(404));
});

router.put('/:id', (req, res) => {
  store.get('disks', req.params.id)
    .then(() => {
      const { body } = req;
      body.id = req.params.id;
      return store.put('disks', body.id, body);
    })
    .then(disk => res.send(disk))
    .catch(() => res.sendStatus(404));
});

router.delete('/:id', (req, res) => {
  store.delete('disks', req.params.id).then(() => {
    res.send();
  });
});

module.exports = router;
module.exports.ROUTE = ROUTE;
