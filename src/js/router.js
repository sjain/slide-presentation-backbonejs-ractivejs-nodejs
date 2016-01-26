var Ractive = require('ractive');

var Backbone = require('backbone');
var backboneAdaptor = require('ractive-adaptors-backbone');
backboneAdaptor.Backbone = Backbone;

var DeckListView = require('./views/deck_list');
var DeckShowView = require('./views/deck_show');
var Deck = require('./models/deck');

var Workspace = Backbone.Router.extend({
  routes: {
    "":                       "home",
    "decks":                  "deck_list",
    "decks/:name":            "deck_show",
  },

  home: function() {
    this.navigate('decks', {trigger: true});
  },

  deck_list: function() {

    var ractive = new Ractive({
      el: 'body',
      template: '<DeckList/>',
      components: { DeckList: DeckListView },
    });
  },

  deck_show: function(deck_name, page) {
    // FIXME How to move this inside DeckShow component?
    var deck = new Deck({name: deck_name});
    deck.fetch();

    var ractive = new Ractive({
      el: 'body',
      template: '<DeckShow deck="{{deck}}"/>',
      components: { DeckShow: DeckShowView },
      data: {
        deck: deck,
      },
      adapt: [ backboneAdaptor ]
    });
  }
});

//module.exports = Workspace;
var _instance;
var SingletonRouter = function() {
  if (_instance === undefined) {
    _instance = new Workspace();
  }
  return _instance;
};
module.exports = new SingletonRouter();

