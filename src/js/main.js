var Backbone = require('backbone');
var Ractive = require('ractive');
var backboneAdaptor = require('ractive-adaptors-backbone');
var Decks = require('./models/decks');

backboneAdaptor.Backbone = Backbone;

global.app = function() {

  var decks = new Decks();

  var ractive = new Ractive({
    el: 'body',
    template: '<h1>There are {{decks.length}} decks!</h1>',
    data: {
      decks: decks,
    },
    adapt: [ backboneAdaptor ]
  });
};

