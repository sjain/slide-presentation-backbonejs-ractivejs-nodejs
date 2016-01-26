var Ractive = require('ractive');
var Decks = require('./models/decks');
var DeckListView = require('./views/deck_list');
var Backbone = require('backbone');
var backboneAdaptor = require('ractive-adaptors-backbone');
backboneAdaptor.Backbone = Backbone;

global.app = function() {

  var decks = new Decks();

  var ractive = new Ractive({
    el: 'body',
    template: '<DeckList decks="{{decks}}"/>',
    data: {
      decks: decks
    },
    components: { DeckList: DeckListView },
    adapt: [ backboneAdaptor ]
  });
};

