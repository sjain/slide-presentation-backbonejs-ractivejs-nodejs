var Backbone = require('backbone');
var router = require('./router');

global.app = function() {
  Backbone.history.start({pushState: true});
};
