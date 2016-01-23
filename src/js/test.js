var Backbone = require('backbone');
var Ractive = require('ractive');
var backboneAdaptor = require('ractive-adaptors-backbone');

backboneAdaptor.Backbone = Backbone;

global.app = function() {

  var user = new Backbone.Model({
    name: 'User'
  });

  var ractive = new Ractive({
    el: '#main',
    template: '<h1>Hello {{user.name}}!</h1>',
    data: {
      user: user
    },
    adapt: [ backboneAdaptor ]
  });
};

