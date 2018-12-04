
/* displays the next upcoming careers fair */


window.careersHubEventFeedConfig = {
    baseURL : 'https://myadvantage.warwick.ac.uk',
    eventsEndpoint : '/api/public/v1/events',
    eventDetailURL : '/students/events/detail/',
};

window.eventList = new Vue({
  el: '#eventList',
  data: {
    events: null,
    config : window.careersHubEventFeedConfig
  },
  mounted: function(){
    var self = this;
    jQuery.ajax({ // pulls in remote data stored in json format.
              url: self.config.baseURL + self.config.eventsEndpoint + "?take=" + self.config.take,
              method: 'GET',
              success: function (data) {
                  self.events = self.cleanData(data);
                  self.addDetailsURL();
              },
              error: function (error) {
                  console.log(error);
              }
          });
    },
    beforeCreate() {
      var display = jQuery('#event-feed-script').attr("display");
      if (display) {
        window.careersHubEventFeedConfig.display = display;
      }
    },

    methods: {

      cleanData: function(data) {
        var self = this;
        let data_cleaned = data
          .filter(function(event){ // remove cancelled events in myAdvantage
            if ( !event.title.toLowerCase().includes("cancelled") ) {
              return event;
            }
        }).map((event) => {
            event.simpledate = event.startUtc.split(":00Z")[0];
            return event;
        }).slice(0, self.config.display);

        return data_cleaned;
      },

       addDetailsURL: function() {
         var self = this;
          for (i = 0; i < self.events.length; i++)
            {
               self.events[i].detailURL =   self.config.baseURL + self.config.eventDetailURL + self.events[i].id;
            };
          jQuery('#eventList ul.media-list').on('click', 'li', function() {
              event.preventDefault();
              window.location.href = self.events[jQuery(this).index()].detailURL;
           });
        }
    },
    filters: { // not used
      toHumanDate(dateUTC) {
          var d = new Date(dateUTC);
          return d.toDateString();
        },
       toHumanStartTime(dateUTC) {
          var date = new Date(dateUTC);
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? '0'+minutes : minutes;
          var strTime = hours + ':' + minutes + ' ' + ampm;
          return strTime;
        },
        toHumanEndTime(dateUTC) {
          var d = new Date(dateUTC);
          return d.toDateString();
        },
    }
  });
