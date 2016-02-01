var Backbone = require('backbone');
var Deck = require('./deck');

module.exports = Backbone.Collection.extend({
  url: function() { return '/api/decks/' + this.deck + "/stats/visitors"; },

  initialize: function () {
    this.models = [];
  },
});
