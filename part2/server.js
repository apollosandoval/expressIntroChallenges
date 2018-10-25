var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var port = process.env.PORT || 8000;

var filepath = path.join(__dirname, './storage.json');

app.get('/', function(req, res) {
  let file = fs.readFileSync(filepath, 'utf8');
  res.send(file);
});

app.get('/:name', function(req, res) {
  let name = req.params.name;
  let file = fs.readFileSync(filepath, 'utf8');

  if (file.indexOf(`{"name":"${name}"`) !== -1) {
    let match = file.indexOf(`{"name":"${name}"`);
    match = file.substring( match, (file.indexOf('}', match)+1) );
    res.send(match);
  } else {
    res.status(400).send('Name does not exist');
  }
});

app.post('/create/:name/:age', function (req, res) {
  let obj = {
    name: req.params.name,
    age: req.params.age
  }

  fs.appendFile(filepath, JSON.stringify(obj), (err) => {
    if (err) throw err;
    console.log('Data appended successfully');
  });
  res.status(201).send('Done!');
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
