var Ractive = require('ractive');
var Backbone = require('backbone');
var backboneAdaptor = require('ractive-adaptors-backbone');
backboneAdaptor.Backbone = Backbone;

var DeckList = Ractive.extend({
  isolated: false,
  template: '<h1>There are {{decks.length}} decks!</h1>' +
    '<table><thead><td>Name</td></thead>' +
    '{{#each decks}}<tr><td>{{name}}</td></tr>{{/each}}' +
    '</table>',
  data: function() {
   return {
     decks: [],
   };
  },
  adapt: [ backboneAdaptor ]
});

module.exports = DeckList;