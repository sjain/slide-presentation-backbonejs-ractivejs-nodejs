var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  url: function() { return '/api/decks/' + this.deck + "/stats/visitors"; },

  initialize: function () {
    this.models = [];
  },
});
