// Generated by CoffeeScript 1.10.0
var Event, americano, ical, log;

americano = require('cozydb');

ical = require('cozy-ical');

log = require('printit')({
  prefix: 'event:model'
});

module.exports = Event = americano.getModel('Event', {
  start: {
    type: String
  },
  end: {
    type: String
  },
  place: {
    type: String
  },
  details: {
    type: String
  },
  description: {
    type: String
  },
  rrule: {
    type: String
  },
  tags: {
    type: function(x) {
      return x;
    }
  },
  attendees: {
    type: [Object]
  },
  related: {
    type: String,
    "default": null
  },
  timezone: {
    type: String
  },
  alarms: {
    type: [Object]
  },
  created: {
    type: String
  },
  lastModification: {
    type: String
  },
  caldavuri: {
    type: String
  }
});

ical.decorateEvent(Event);

Event.all = function(params, callback) {
  return Event.request("all", params, callback);
};

Event.byCalendar = function(calendarId, callback) {
  return Event.request('byCalendar', {
    key: calendarId
  }, callback);
};

Event.getInRange = function(options, callback) {
  return Event.request('byDate', options, callback);
};

Event.createOrUpdate = function(data, callback) {
  var changes, id;
  id = data.id;
  data.caldavuri = id;
  data.docType = "Event";
  delete data._id;
  delete data._attachments;
  delete data._rev;
  delete data.binaries;
  delete data.id;
  changes = {
    creation: false,
    update: false
  };
  return Event.request('bycaldavuri', {
    key: id
  }, function(err, events) {
    var event, oldValue;
    if (err != null) {
      log.error(err);
      changes.creation = true;
      return Event.create(data, function(err, event) {
        return callback(err, event, changes);
      });
    } else if (events.length === 0) {
      changes.creation = true;
      return Event.create(data, function(err, event) {
        return callback(err, event, changes);
      });
    } else if (data.caldavuri === events[0].caldavuri) {
      log.debug('Event already exists, updating...');
      event = events[0];
      if (data.place == null) {
        data.place = null;
      }
      if (event.place == null) {
        event.place = null;
      }
      if (data.description == null) {
        data.description = null;
      }
      if (event.description == null) {
        event.description = null;
      }
      if (data.detail == null) {
        data.detail = null;
      }
      if (event.detail == null) {
        event.detail = null;
      }
      if (data.start !== event.start || data.end !== event.end || data.place !== event.place || data.description !== event.description || data.details !== event.details) {
        oldValue = event.toJSON();
        changes.update = true;
        return event.updateAttributes({
          start: data.start,
          end: data.end,
          place: data.place,
          description: data.description,
          details: data.details,
          rrule: data.rrule,
          tags: data.tags
        }, function(err) {
          event.beforeUpdate = oldValue;
          return callback(err, event, changes);
        });
      } else {
        return callback(null, event, changes);
      }
    } else {
      changes.creation = true;
      return Event.create(data, function(err, event) {
        return callback(err, event, changes);
      });
    }
  });
};
