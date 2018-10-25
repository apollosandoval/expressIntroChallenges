var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.get('/', function(req, res) {
  res.sendFile('./index.html', {root: __dirname}, (err) => {
    if(err) throw err;
    else {
      console.log('sent');
    }
  })
});

app.get('/hello', function(req, res) {
  res.send("Hello!");
});

app.get('/verify/:age', function(req, res) {
  let age = req.params.age;

  res.sendStatus(age > 13 ? 200 : 403);
});

app.post('/create/:name', function(req, res) {
  let obj = {
    id: 1,
    name: req.params.name
  }
  res.json(obj);
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
