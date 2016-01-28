var Ractive = require('ractive');
var Backbone = require('backbone');
var backboneAdaptor = require('ractive-adaptors-backbone');
backboneAdaptor.Backbone = Backbone;


var componentTemplate = '<title/>';
var titleTemplate = '<h1>Visitor Stats for Deck {{visitorStats.deck}}!</h1>';

var StatsShow = Ractive.extend({
  isolated: false,
  template: componentTemplate,
  data: function() {
    return {
      visitorStats: null,
    };
  },
  components: {
    title: Ractive.extend({template: titleTemplate}),
  },
  adapt: [ backboneAdaptor ],
});

module.exports = StatsShow;