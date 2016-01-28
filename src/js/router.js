var Ractive = require('ractive');

var Backbone = require('backbone');
var backboneAdaptor = require('ractive-adaptors-backbone');
backboneAdaptor.Backbone = Backbone;

var DeckListView = require('./views/deck_list');
var DeckShowView = require('./views/deck_show');
var Deck = require('./models/deck');
var SlideShowView = require('./views/slide_show');
var Slide = require('./models/slide');
var StatsShowView = require('./views/stats_show');
var VisitorStats = require('./models/visitor_stats');

var Workspace = Backbone.Router.extend({
  routes: {
    "":                            "home",
    "decks":                       "deck_list",
    "decks/:name":                 "deck_show",
    "decks/:deck/slides/:slideNo": "slide_show",
    "decks/:deck/stats":           "stats_show",
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

  deck_show: function(deck_name) {
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
  },

  slide_show: function(deck_name, slide_id) {
    var slide = new Slide({deck: deck_name, id: slide_id});
    slide.deck = deck_name;
    slide.fetch();

    var ractive = new Ractive({
      el: 'body',
      template: '<SlideShow slide="{{slide}}"/>',
      components: { SlideShow: SlideShowView },
      data: {
        slide: slide,
      },
      adapt: [ backboneAdaptor ]
    });
  },

  stats_show: function(deck_name) {
    var visitorStats = new VisitorStats({deck: deck_name});
    visitorStats.deck = deck_name;
    console.log('visitorStats.deck:', visitorStats.deck);
    console.log('visitorStats.url():', visitorStats.url());
    visitorStats.fetch();

    var ractive = new Ractive({
      el: 'body',
      template: '<StatsShowView visitorStats="{{visitorStats}}"/>',
      components: { StatsShowView: StatsShowView },
      data: {
        visitorStats: visitorStats,
      },
      adapt: [ backboneAdaptor ]
    });
  },
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

