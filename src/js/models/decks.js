var Backbone = require('backbone');
var Deck = require('./deck');

module.exports = Backbone.Collection.extend({
  //model: Deck,
  url: '/api/decks',

  initialize: function () {
    this.models = [];
    this.fetch({
      success: this.fetchSuccess,
      error: this.fetchError
    });
  },

  parse: function (response) {
    var decks = response.decks.map(function(deckName) {
      return {name: deckName};
    });
    return decks;
  },

  fetchSuccess: function (collection, response) {
    // response: JSON from server
    // collection.models == Backbone.Model objects
  },

  fetchError: function (collection, response) {
    throw new Error("Decks fetch error");
  }
});
