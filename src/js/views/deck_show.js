var Ractive = require('ractive');
var Backbone = require('backbone');
var backboneAdaptor = require('ractive-adaptors-backbone');
backboneAdaptor.Backbone = Backbone;


var componentTemplate = '<title/>';
var titleTemplate = '<h1>Deck {{deck.name}} has {{deck.slides}} slides!</h1>';

var DeckShow = Ractive.extend({
  isolated: false,
  template: componentTemplate,
  data: function() {
    return {
      deck: null,
    };
  },
  components: {
    title: Ractive.extend({template: titleTemplate}),
  },
  adapt: [ backboneAdaptor ],
});

module.exports = DeckShow;