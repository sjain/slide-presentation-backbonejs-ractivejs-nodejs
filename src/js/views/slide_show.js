var Ractive = require('ractive');
var Backbone = require('backbone');
var backboneAdaptor = require('ractive-adaptors-backbone');
backboneAdaptor.Backbone = Backbone;


// FIXME These template snippets are not scalable. Figure out external HTML template files..
var componentTemplate = '<div class="page-slide-show"><title/><slide/><navigationBar/></div>';
var slideTemplate = '<div class="slide"><heading/><image/><paragraph/></div>';
var titleTemplate = '<h1>{{slide.deck}}</h1>';
var headingTemplate = '<h4>{{slide.slide[0].heading}}</h4>';
var paragraphTemplate = '<p>{{slide.slide[0].para}}</p>';
var imageTemplate = '<img src="{{slide.slide[0].image}}"/>';
var navigationBar = '<ul class="nav-bar"><previousLink/><currentSlideInfo/><nextLink/></ul>';
var previousLink = '{{#if parseInt(slide.id) != 1}}<previousSlideLink/>{{/if}}{{#if parseInt(slide.id) == 1}}<returnToDeckListLink/>{{/if}}';
var returnToDeckListLink = '<li><a href="/decks">All Decks</a></li>';
var previousSlideLink = '<li><a href="/decks/{{slide.deck}}/slides/{{ parseInt(slide.id)-1}}">&lt;&lt;</a></li>';
var currentSlideInfo = '<li>Slide {{slide.id}} of {{slide.slides}}</li>';
var nextLink = '{{#if parseInt(slide.id) != slide.slides}}<nextSlideLink/>{{/if}}{{#if parseInt(slide.id) == slide.slides}}<deckStatsLink/>{{/if}}';
var nextSlideLink = '<li><a href="/decks/{{slide.deck}}/slides/{{ parseInt(slide.id) + 1 }}">&gt;&gt;</a></li>';
var deckStatsLink = '<li><a href="/decks/{{slide.deck}}/stats">Finish</a></li>';

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
    slide: Ractive.extend({template: slideTemplate}),
    paragraph: Ractive.extend({template: paragraphTemplate}),
    image: Ractive.extend({template: imageTemplate}),
    navigationBar: Ractive.extend({template: navigationBar}),
    previousLink: Ractive.extend({template: previousLink}),
    previousSlideLink: Ractive.extend({template: previousSlideLink}),
    returnToDeckListLink: Ractive.extend({template: returnToDeckListLink}),
    currentSlideInfo: Ractive.extend({template: currentSlideInfo}),
    nextLink: Ractive.extend({template: nextLink}),
    nextSlideLink: Ractive.extend({template: nextSlideLink}),
    deckStatsLink: Ractive.extend({template: deckStatsLink}),
  },
  adapt: [ backboneAdaptor ],
});

module.exports = SlideShow;

