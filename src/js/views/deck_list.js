var Ractive = require('ractive');
var $ = require('jquery');
var Backbone = require('backbone');
var backboneAdaptor = require('ractive-adaptors-backbone');
backboneAdaptor.Backbone = Backbone;

var Decks = require('../models/decks');

var componentTemplate = '<title/><list/>';
var titleTemplate = '<h1>There are {{decks.length}} decks!</h1>';
var listTemplate = "<ul>{{#each decks}}<list-item />{{/each}}</ul>";
var listItemTemplate = "<li><a href='/decks/{{name}}/slides/1'>{{name}}</a></li>";

var decks = new Decks();

var DeckList = Ractive.extend({
  isolated: false,
  template: componentTemplate,
  data: function() {
   return {
     decks: decks,
   };
  },
  components: {
    title: Ractive.extend({template: titleTemplate}),
    list: Ractive.extend({template: listTemplate}),
    'list-item': Ractive.extend({template: listItemTemplate})
  },
  adapt: [ backboneAdaptor ],
});

module.exports = DeckList;