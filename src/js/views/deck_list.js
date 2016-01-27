var Ractive = require('ractive');
var $ = require('jquery');
var Backbone = require('backbone');
var backboneAdaptor = require('ractive-adaptors-backbone');
backboneAdaptor.Backbone = Backbone;

var Decks = require('../models/decks');

var componentTemplate = '<title/><list/>';
var titleTemplate = '<h1>There are {{decks.length}} decks!</h1>';
var listTemplate = "<ul>{{#each decks}}<list-item />{{/each}}</ul>";
var listItemTemplate = "<li><a href='/decks/{{name}}'>{{name}}</a></li>";

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
  oncomplete: function() {
    $(document).on("click", "a:not([data-bypass])", function(evt) {
      var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
      console.log('href:', href);
      var root = location.protocol + "//" + location.host + Backbone.history.options.root;

      if (href.prop && href.prop.slice(0, root.length) === root) {
        evt.preventDefault();
        Backbone.history.navigate(href.attr, true);
      }
    });
  }
});

module.exports = DeckList;