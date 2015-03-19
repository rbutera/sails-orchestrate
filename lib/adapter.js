/**
 * Module Dependencies
 */
var assert = require("assert"),
    lucene = require("./lucene"),
    norm = require("./norm.js");
module.exports = (function () {


  var connectionsList = {};
  var connections = {};
  var db;

  var adapter = {
     identity: 'sails-orchestrate',
     syncable: false,
    // Default configuration for connections
    defaults: {
      masterkey: "",
      developmentkey: "",
      status: "live"
    },

    /**
     *
     * This method runs when a model is initially registered
     * at server-start-time.  This is the only required method.
     *
     * @param  {[type]}   connection [description]
     * @param  {[type]}   collection [description]
     * @param  {Function} cb         [description]
     * @return {[type]}              [description]
     */
    registerConnection: function(connection, collections, cb) {
      if(db === undefined) {

        if (connection.status == "live"){

          db = require("orchestrate")(connection.masterkey);
        }
        else if (connection.status == "dev"){
          db = require("orchestrate")(connection.developmentkey);
        }
        else {
          assert.fail(connection.status, "Your app status must either be live or dev");
        }
      }

      if(!connection.identity) return cb(new Error('Connection is missing an identity.'));
      if(connections[connection.identity]) return cb(new Error('Connection is already registered.'));
      connections[connection.identity] = connection;
      collectionsList = collections;
      cb();
    },

    /**
     *
     * This method is used to interface with orchestrate search function
     * @param {object} connection
     * @param {string} collection
     * @param {object} options
     * @param {function} cb
     *
     */

    find: function (connection, collection, options, cb) {
      var limit = options.limit ? options.limit : 20;
      var offset = options.skip ? options.skip : 0;
      var query = options.where ? lucene.parse(options.where) : "*";
      var find = db;
      find = find.newSearchBuilder()
        .collection(collection)
        .limit(limit)
        .offset(offset)
        .query(query);

      find.then(function (results){
        results = results.body.results ? results.body.results : results.body.value ? results.body.value : results.body;
        if(results) results = norm.lize(results);
        cb(null, results);
      })
      .fail(function (err){
        cb(err);
      });
    },

    get: function(connection, collection, options, cb) {
      var limit = options.limit ? options.limit : 20;
      var offset = options.skip ? options.skip : 0;
      var key = options.key;

      db.get(collection, key)
      .then(function(results){
        if(results) cb(null, results.body);
      })
      .fail(function (err){
        cb(err);
      });
    },

    /**
      * this function is what creates records in selected orchestreate
      * app.
      *
      * @param {object} connection
      * @param {string} collection
      * @param {object} values
      * @param {function} cb
      */

    create: function (connection, collection, values, cb) {
      var resObjects = [];
      var create = db;
      var self = this;
      if(!values.id || values.id === "") {
        create = create.post(collection, values);
      } else {
        var key = values.id;
        delete values.id;
        delete values.ref;
        create = create.put(collection, key, values);
      }

      create.then(function (results){
        if(!key){
          key = results.headers.location.split("/")[3];
        }
        setTimeout(function(){
          self.find(connection, collection, {where: {id: key}}, function (err, results){
            cb(err, results[0]);
          });
        }, 100);
      })
      .fail(function (err){
        cb(err);
      });
    },

    /**
      * this function is what update records in selected orchestrate
      * app.
      *
      * @param {object} connection
      * @param {string} collection
      * @param {object} options (used to identify how to fetch records)
      * @param {object} values
      * @param {function} cb
      */

    update: function (connection, collection, options, values, cb) {
      var self = this;
      var finalResults = [];
      console.log(options); 
      self.find(connection, collection, options, function (err, results){
        console.log(results);
        if(err) cb(err);
        if(Array.isArray(results) && results.length > 0){
          results.forEach(function (e, i){
            results[i] = updateObject(values, e);
            self.create(connection, collection, results[i], function (err, result){
              if(err) cb(err);
              finalResults.push(result);
              if(finalResults.length == results.length){
                cb(null, finalResults);
              }
            });
          });
        }
      });
    },
    /**
      * This function is meant to search results total.
      *
      */

    search_total_results: function (connection, collection, options, cb) {
      var limit = options.limit ? options.limit : 20;
      var offset = options.skip ? options.skip : 0;
      var query = options.where ? lucene.parse(options.where) : "*";
      var find = db;

      find = find.newSearchBuilder()
        .collection(collection)
        .limit(limit)
        .offset(offset)
        .query(query);

      find.then(function (results){
        results_count = results.body.total_count;
        cb(null, results_count);
      })
      .fail(function (err){
        cb(err);
      });
    },


    /**
      * this function is what destroys records in selected orchestrate
      * app.
      *
      * @param {object} connection
      * @param {string} collection
      * @param {object} options (used to identify how to fetch records)
      * @param {object} values
      * @param {function} cb
      */

    destroy: function (connection, collection, options, cb) {
      var self = this;
      var finalResults = [];
      var testing = options.where ? "true" : "false";
      self.find(connection, collection, options, function (err, results){
        if(err) cb(err);
        if(Array.isArray(results) && testing === "true"){
          results.forEach(function(r){
            iterDelete(collection, r, function (err, result){
              if(err) cb(err);
              finalResults.push(result);
              if(finalResults.length === results.length){
                cb(null, finalResults);
              }
            });
          });
        } else {

          var remove = db;
          if(testing === "true"){
            remove = remove.remove(collection, results.id, true);
          }

          if(testing === "false"){
            remove = remove.deleteCollection(collection);
          }
          remove.then(function(results){
            results = results.body.results ? results.body.results : results.body.value ? results.body.value : results.body;
            cb(null, results);
          })
          .fail(function (err){
            cb(err);
          });
        }
      });
    },

    /**
      * This will allow users to create a graph between two
      * records.
      *
      * @param {object} connection
      * @param {string} collection
      * @param {object} values
      * @param {function} cb
      */
    graphCreate: function (connection, collection, values, cb){

      checkValues(values);

      var startkey = values.key,
        endCol = values.toCollection,
        endKey = values.toKey,
        relation = values.relation;

      db.newGraphBuilder()
      .create()
      .from(collection, startkey)
      .related(relation)
      .to(endCol, endKey)
      .then(function (results){
        cb(null, results.body);
      })
      .fail(function (err){
        cb(err.body);
      });
  },

  /**
    * Reads the graph elements from a key/value object
    *
    * @param {object} connection
    * @param {string} collection
    * @param {object} values
    * @param {function} cb
    */

  graphRead: function (connection, collection, values, cb) {
    var g = db.newGraphReader()
              .get()
              .from(collection, values.key);
    if(Array.isArray(values.relation)) {
      g = g.related(relation[0], relation[1]);

    } else if(typeof values.relation == "string"){
      g = g.related(values.relation);
    }

    g.then(function(results){
      results = results.body.results ? results.body.results : results.body.value ? results.body.value : results.body;
      if(results) results = norm.lize(results);

      cb(null, results);
    })
    .fail(function (err){
      cb(err);
    });
  },


  /**
    * Deletes a graph element from a key/value object
    *
    * @param {object} connection
    * @param {string} collection
    * @param {object} values
    * @param {function} cb
    */

  graphDelete: function (connection, collection, values, cb) {
    db.newGraphBuilder()
      .remove()
      .from(collection, values.key)
      .related(values.relation)
      .to(values.toCollection, values.toKey)
      .then(function (results){
        cb(null, results.body);
      })
      .fail(function (err){
        cb(err);
      });
  },

  /**
    * Event creation object
    *
    * @param {object} connection
    * @param {string} collection
    * @param {object} values
    * @param {function} cb
    */

  eventCreate: function (connection, collection, values, cb) {
    var eventDB = db.newEventBuilder()
      .from(collection, values.key)
      .type(values.type);

      if(values.time){
        eventDB.time(values.time);
      }

      eventDB.data(values.data)
      .create()
      .then(function (results){
        cb(null, results.body);
      })
      .fail(function (err){
        cb(err);
      });
  },


  /**
    * Event display list of objects
    *
    * @param {object} connection
    * @param {string} collection
    * @param {object} values
    * @param {function} cb
    */

  eventList: function (connection, collection, values, cb) {
    eventsDb = db.newEventReader().from(collection, values.key);

    if(values.start){
      eventsDb.start(values.start);
    }

    if(values.end){
      eventsDb.end(values.end);
    }

    eventsDb.type(values.type)
    .list()
    .then(function (results){
      cb(null, results.body);
    })
    .fail(function (err){
      cb(err);
    });
  },

  /**
    * Event display a single object.
    *
    * @param {object} connection
    * @param {string} collection
    * @param {object} values
    * @param {function} cb
    */

  eventRead: function (connection, collection, values, cb) {
    eventsDb = db.newEventReader().from(collection, values.key);
    if(values.time){
      eventsDb.time(values.time);
    }

    if(values.ordinal){
      eventsDb.ordinal(values.ordinal);

    }
    eventsDb.type('update')
      .get()
      .then(function(results){
        cb(null, results.body);
      })
      .fail(function (err){
        cb(err);
      });
  },


  /**
    * Update an event object
    *
    * @param {object} connection
    * @param {string} collection
    * @param {object} values
    * @param {function} cb
    */

  eventUpdate: function (connection, collection, values, cb) {
    eventsDB = db.newEventBuilder()
      .from(collection, values.key)
      .type(values.type)
      .time(values.time)
      .ordinal(values.ordinal)
      .data(values.data);

      if(values.ref){
        eventsDB.ref(values.ref);
      }

      eventsDB.update()
      .then(function (results){
        cb(null, results);
      })
      .fail(function (err){
        cb(err);
      });
  },

  /**
    * Event delete object
    *
    * @param {object} connection
    * @param {string} collection
    * @param {object} values
    * @param {function} cb
    */

  eventDelete: function (connection, collection, values, cb) {
    eventsDB = db.newEventBuilder()
      .from(collection, values.key)
      .type(values.type)
      .time(values.time)
      .ordinal(values.ordinal)
      .remove()
      .then(function (results){
        cb(null, results);
      })
      .fail(function (err){
        cb(err);
      });
  }
};


//private functions
function checkValues(values){
  assert.equal(!values.hasOwnProperty("key"), false, "You must provide a" +
    "starting key");

  assert.equal(!values.hasOwnProperty("toCollection"), false, "You must provide a" +
    "end collection.");

  assert.equal(!values.hasOwnProperty("toKey"), false, "You must provide a" +
    "ending key.");

  assert.equal(!values.hasOwnProperty("relation"), false, "You must provide a" +
    "relationship.");
}

/**
  * This is a function to update stored objects
  *
  * @param {object} updatedValues
  * @param {object} objectToUpdate
  *
  */

function updateObject(updatedValues, objectToUpdate){
  for(var key in updatedValues) {
    if(key !== "id" || key !== "ref") {
      objectToUpdate[key] = updatedValues[key];
    }
  }
  return objectToUpdate;
}

  /**
    * This funtion is made for a iteration update
    *
    * @param {object} value
    * @param {int} interator
    * @param {function} cb
    *
    */

  function iterDelete(collection , value, cb) {
    var key = value.id;

    db.remove(collection, key, true)
    .then(function (result){
      cb(null, value);
    })
    .fail(function (err){
      cb(err);
    });
  }


  // Expose adapter definition
  return adapter;

})();
