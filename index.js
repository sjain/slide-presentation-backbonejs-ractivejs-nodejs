var fs = require('fs');
var express = require('express');

var SLIDES = JSON.parse(fs.readFileSync('./slides.json'));

function toResponse(obj) {
  return JSON.stringify(obj);
}

var app = express();
app.use(express.static('.'));

app.get('/api/decks', function(req, res) {
  res.header('Content-Type', 'application/json');
  res.send(toResponse({
    decks: Object.keys(SLIDES)
  }));
});

app.get('/api/decks/:deck', function(req, res) {
  var deck = SLIDES[req.params.deck];
  res.header('Content-Type', 'application/json');
  if (!deck) {
    res.status(404);
    res.send(toResponse({
      messsage: 'not found'
    }));
  } else {
    var resp = {
      slides: deck.length,
    };
    res.send(toResponse(resp));
  }
});

app.get('/api/decks/:deck/stats/visitors', function(req, res) {
  res.header('Content-Type', 'application/json');

  var base = new Date();
  var dataset = [];
  for (var i = 0; i < 35 ; i++) {
    var offset = 1000 * 24 * 60 * 60 * i,
        timestamp = (+base) - offset,
        value = Math.floor(Math.random() * 1000);

    dataset.push({ timestamp: timestamp, value: value });
  }

  res.send(toResponse(dataset));
});

app.get('/api/decks/:deck/stats/countries', function(req, res) {
  res.header('Content-Type', 'application/json');

  var dataset = [ "UK", "Portugal", "Netherlands", "Poland"].map(function(name) {
    return { country: name, value: Math.floor(Math.random() * 1000) };
  });

  res.send(toResponse(dataset));
});

app.get('/api/decks/:deck/slide/:slideNo', function(req, res) {
  var deck = SLIDES[req.params.deck];
  res.header('Content-Type', 'application/json');
  if (!deck) {
    res.status(404);
    res.send(toResponse({
      messsage: 'not found'
    }));
  } else {
    var slideNo = req.params.slideNo;

    var resp = {
      slides: deck.length,
      slide: deck[+slideNo - 1] || []
    };

    if (resp.slide.length === 0) {
      res.status(404);
    }
    res.send(toResponse(resp));
  }
});

app.get(['/','/deck*'], function(req, res) {
  var path = require('path');
  res.sendFile(path.join(__dirname + '/index.html'));
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
