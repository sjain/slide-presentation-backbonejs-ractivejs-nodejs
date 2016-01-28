var Backbone = require('backbone');
var Deck = require('./deck');

module.exports = Backbone.Collection.extend({
  url: function() { return '/api/decks/' + this.deck + "/stats/visitors"; },

  initialize: function () {
    this.models = [];
    this.fetch({
      success: this.fetchSuccess,
      error: this.fetchError
    });
  },

  fetchSuccess: function (collection, response) {
    console.log('collection:', collection);
  },

  fetchError: function (collection, response) {
    throw new Error("Visitor Stats fetch error");
  }
});
