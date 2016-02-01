var Ractive = require('ractive');
var Backbone = require('backbone');
var backboneAdaptor = require('ractive-adaptors-backbone');
backboneAdaptor.Backbone = Backbone;

var Highcharts = require('highcharts');

var componentTemplate = '<title/><visitorStatsChart/>';
var titleTemplate = '<h1>Visitor Stats for Deck {{visitorStats.deck}}!</h1>';
var visitorStatsChart = '<div id="visitor-stats-chart" style="width:100%; height:400px;"></div>';

var StatsShow = Ractive.extend({
  isolated: false,
  template: componentTemplate,
  data: function() {
    return {
      visitorStats: null,
    };
  },
  components: {
    title: Ractive.extend({template: titleTemplate}),
    visitorStatsChart: Ractive.extend({template: visitorStatsChart}),
  },
  adapt: [ backboneAdaptor ],
  oncomplete: function() {

    var stats = this.get('visitorStats');
    stats.fetch().then(function(stats) {
      var dates = stats.reduce(function(dates, stat){
        dates.push(new Date(stat.timestamp).toDateString());
        return dates;
      }, []).reverse();
      var visitorCounts = stats.reduce(function(visitorCounts, stat){
        visitorCounts.push(stat.value);
        return visitorCounts
      }, []).reverse();

      var chart = new Highcharts.Chart({
        chart: {
          renderTo: 'visitor-stats-chart'
        },
        title: { text: "Visitor Stats" },
        xAxis: {
          categories: dates,
          title: {
            text: 'Date'
          }
        },
        yAxis: {
          title: {
            text: '# of visitors'
          }
        },
        series: [{
          name: 'Recent Visits',
          data: visitorCounts,
        }]
      });
    });
  }
});

module.exports = StatsShow;