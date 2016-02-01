var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  url: function() { return '/api/decks/' + this.deck + "/stats/countries"; },

  initialize: function () {
    this.models = [];
  },
});
