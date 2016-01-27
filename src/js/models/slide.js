var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  url: function() { return '/api/decks/' + this.deck + "/slide/" + this.id; },
});

