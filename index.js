const express = require('express');
const bcrypt = require('bcrypt');

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());

//sanity route
server.get('/', (req, res) => {
  res.send('up and running...');
});

server.get('/users', (req, res) => {
  db('users')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

server.post('/register', function(req, res) {
  const user = req.body;

  //hash password
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  db('users')
    .insert(user)
    .then(ids => {
      db('users')
        .where({ id: ids[0] })
        .first()
        .then(user => {
          res.status(201).json(user);
        });
    })
    .catch(err => res.send(err));
});

server.listen(3300, () => console.log('\nrunning on port 3300\n'));
