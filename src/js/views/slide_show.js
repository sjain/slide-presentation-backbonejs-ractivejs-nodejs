var Ractive = require('ractive');
var Backbone = require('backbone');
var backboneAdaptor = require('ractive-adaptors-backbone');
backboneAdaptor.Backbone = Backbone;


var componentTemplate = '<title/><heading/><paragraph/><image/><footer/>';
var titleTemplate = '<h1>{{slide.deck}}</h1>';
var headingTemplate = '<h4>{{slide.slide[0].heading}}</h4>';
var paragraphTemplate = '<p>{{slide.slide[0].para}}</p>';
var imageTemplate = '<img src="{{slide.slide[0].image}}"/>';
var footerTemplate = '<ul class="footer"><previousSlideLink/><currentSlideInfo/><nextSlideLink/></ul>';
var previousSlideLink = '<li><a href="/decks/{{slide.deck}}/slides/{{ parseInt(slide.id)-1}}">&lt;&lt;</a></li>';
var currentSlideInfo = '<li>Slide {{slide.id}} of {{slide.slides}}</li>';
var nextSlideLink = '<li><a href="/decks/{{slide.deck}}/slides/{{ parseInt(slide.id) + 1 }}">&gt;&gt;</a></li>';

var SlideShow = Ractive.extend({
  isolated: false,
  template: componentTemplate,
  data: function() {
    return {
      slide: null,
    };
  },
  components: {
    title: Ractive.extend({template: titleTemplate}),
    heading: Ractive.extend({template: headingTemplate}),
    paragraph: Ractive.extend({template: paragraphTemplate}),
    image: Ractive.extend({template: imageTemplate}),
    footer: Ractive.extend({template: footerTemplate}),
    previousSlideLink: Ractive.extend({template: previousSlideLink}),
    currentSlideInfo: Ractive.extend({template: currentSlideInfo}),
    nextSlideLink: Ractive.extend({template: nextSlideLink}),
  },
  adapt: [ backboneAdaptor ],
});

module.exports = SlideShow;

