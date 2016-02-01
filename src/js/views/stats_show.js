var Ractive = require('ractive');
var Backbone = require('backbone');
var backboneAdaptor = require('ractive-adaptors-backbone');
backboneAdaptor.Backbone = Backbone;

var Highcharts = require('highcharts');

var componentTemplate = '<title/><visitorStatsChart/><countryStatsChart/>';
var titleTemplate = '<h1>Visitor Stats for Deck {{visitorStats.deck}}!</h1>';
var visitorStatsChart = '<div id="visitor-stats-chart" style="width:100%; height:400px;"></div>';
var countryStatsChart = '<div id="country-stats-chart" style="width:100%; height:400px;"></div>';

var StatsShow = Ractive.extend({
  isolated: false,
  template: componentTemplate,
  data: function() {
    return {
      visitorStats: null,
      countryStats: null,
    };
  },
  components: {
    title: Ractive.extend({template: titleTemplate}),
    visitorStatsChart: Ractive.extend({template: visitorStatsChart}),
    countryStatsChart: Ractive.extend({template: countryStatsChart}),
  },
  adapt: [ backboneAdaptor ],
  oncomplete: function() {
    var visitorStats = this.get('visitorStats');
    console.log('visitorStats:', visitorStats);
    visitorStats.fetch().then(this.displayVisitorStatsChart);
    var countryStats = this.get('countryStats');
    console.log('countryStats:', countryStats);
    countryStats.fetch().then(this.displayCountryStatsChart);
  },
  displayVisitorStatsChart: function(stats) {
    var dates = stats.reduce(function(dates, stat){
      dates.push(new Date(stat.timestamp).toDateString());
      return dates;
    }, []).reverse();
    var visitorCounts = stats.reduce(function(visitorCounts, stat){
      visitorCounts.push(stat.value);
      return visitorCounts;
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
  },
  displayCountryStatsChart: function(stats) {
    var countries = stats.reduce(function(countries, stat){
      countries.push(stat.country);
      return countries;
    }, []).reverse();
    var visitorCounts = stats.reduce(function(visitorCounts, stat){
      visitorCounts.push(stat.value);
      return visitorCounts;
    }, []).reverse();

    var chart = new Highcharts.Chart({
      chart: {
        type: 'bar',
        renderTo: 'country-stats-chart',
      },
      title: { text: "Country Stats" },
      xAxis: {
        categories: countries,
        title: {
          text: 'Country'
        }
      },
      yAxis: {
        title: {
          text: '# of visitors'
        }
      },
      series: [{
        name: 'Visits from top countries',
        data: visitorCounts,
      }]
    });
  }
});

module.exports = StatsShow;