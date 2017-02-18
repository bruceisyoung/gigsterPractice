let path = require('path');

module.exports = (app, express, rootPath) => {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(rootPath, 'index.html'));
  });

  app.get('/expense', (req, res) => {
  });

  app.get('/allexpense', (req, res) => {
  });

  app.post('/login', (req, res) => {
  });

  app.post('/signup', (req, res) => {
  });

  app.post('/addadmin', (req, res) =>{
  });

  app.post('/saveexpense', (req, res) => {
  });

  app.post('/deleteexpense', (req, res) => {
  });

  app.post('/updateexpense', (req, res) => {
  });
};