const express = require('express');
const router = express.Router();

const User = require('../dao').models.User;

/* GET users listing. */
router.get('/', (req, res, next) => {
  User
    .findAll()
    .then(users => {
      res.json(users || []);
    })
    .catch(error => {
      console.error(error);
      res
        .status(500)
        .send('Unexpected error');
    });
});

router.get('/:userId', (req, res) => {
  User
    .findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .send('Not found');
      }
      res
        .status(200)
        .json(user);
    })
    .catch(error => {
      console.error(error);
      res
        .status(500)
        .send('Unexpected error');
    });
});

router.post('/', (req, res) => {
  User 
    .create(req.body)
    .then(() => {
      res
        .status(201)
        .send('Done');
    })
    .catch(error => {
      console.error(error);
      res
        .status(500)
        .send('Unexpected error');
    });
});

router.put('/:userId', (req, res) => {
  User
    .update(
      req.body,
      { 
        where: { id: req.params.userId }
      }
    )
    .then(() => res.status(200).send('Done'))
    .catch(error => {
      console.error(error);
      res
        .status(500)
        .send('Unexpected error');
    });
});

router.delete('/:userId', (req, res) => {
  User
    .destroy({ where: { id: req.params.userId } })
    .then(() => res.status(200).send('Done'))
    .catch(error => {
      console.error(error);
      res
        .status(500)
        .send('Unexpected error');
    });
});

module.exports = router;