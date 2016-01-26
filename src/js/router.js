var Ractive = require('ractive');

var Backbone = require('backbone');
var backboneAdaptor = require('ractive-adaptors-backbone');
backboneAdaptor.Backbone = Backbone;

var Decks = require('./models/decks');
var DeckListView = require('./views/deck_list');

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
  },

  deck_show: function(query, page) {
    var ractive = new Ractive({
      el: 'body',
      template: 'Query: {{query}} <br/>Page: {{page}}',
      data: {
        query: query,
        page: page
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

