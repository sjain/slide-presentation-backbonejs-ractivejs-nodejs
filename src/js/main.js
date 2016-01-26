var Backbone = require('backbone');
var Ractive = require('ractive');
var backboneAdaptor = require('ractive-adaptors-backbone');
var Decks = require('./models/decks');

backboneAdaptor.Backbone = Backbone;

global.app = function() {

  var decks = new Decks();

  var template = '<h1>There are {{decks.length}} decks!</h1>' +
    '<table><thead><td>Name</td></thead>' +
    '{{#each decks}}<tr><td>{{name}}</td></tr>{{/each}}' +
    '</table>';

  var ractive = new Ractive({
    el: 'body',
    template: template,
    data: {
      decks: decks,
    },
    adapt: [ backboneAdaptor ]
  });
};

