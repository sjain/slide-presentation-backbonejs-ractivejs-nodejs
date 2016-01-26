var Ractive = require('ractive');
var Backbone = require('backbone');
var backboneAdaptor = require('ractive-adaptors-backbone');
backboneAdaptor.Backbone = Backbone;

var componentTemplate = '<title/><list/>';
var titleTemplate = '<h1>There are {{decks.length}} decks!</h1>';
var listTemplate = "<ul>{{#each decks}}<list-item />{{/each}}</ul>";
var listItemTemplate = "<li>{{name}}</li>";

var DeckList = Ractive.extend({
  isolated: false,
  template: componentTemplate,
  data: function() {
   return {
     decks: [],
   };
  },
  components: {
    title: Ractive.extend({template: titleTemplate}),
    list: Ractive.extend({template: listTemplate}),
    'list-item': Ractive.extend({template: listItemTemplate})
  },
  adapt: [ backboneAdaptor ]
});

module.exports = DeckList;