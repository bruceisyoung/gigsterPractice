let path = require('path');
let bcrypt = require('bcrypt');

let User = require('../db/userdb');
let Expense = require('../db/expensedb');

module.exports = (app, express, rootPath) => {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(rootPath, 'index.html'));
  });

  app.get('/api/expense', (req, res) => {
  });

  app.get('/api/allexpense', (req, res) => {
  });

  app.post('/api/login', (req, res) => {
    User.findOne({username: req.body.username}).exec((err, user) => {
      if(!user) {
        res.status(209).send('This username doesn\'t exist.');
      } else {
        bcrypt.compare(req.body.password, user.password, (err, match) => {
          if (match) {
            res.status(200).send({
              username: req.body.username,
              isAdmin: user.isAdmin
            });
          } else {
            res.status(210).send('Password doesn\'t match with record.');
          }
        });
      }
    });
  });

  app.post('/api/signup', (req, res) => {
    User.findOne({username: req.body.username}).exec((err, user) => {
      if (user) {
        res.status(211).send('This username already exist.');
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          let newUser = new User({
            username: req.body.username,
            password: hash,
            isAdmin: false
          });
          newUser.save((err, user) => {
            if (err) {
              res.status(212).send('Internal Database Error. Please try again later.');
            } else {
              res.status(200).send({
                username: req.body.username,
                isAdmin: false
              });
            }
          });
        });
      }
    });
  });

  app.post('/api/logout', (req, res) => {
    res.status(200).send('Successfully log out');
  })

  app.post('/api/addadmin', (req, res) =>{
  });

  app.post('/api/saveexpense', (req, res) => {
  });

  app.post('/api/deleteexpense', (req, res) => {
  });

  app.post('/api/updateexpense', (req, res) => {
  });
};