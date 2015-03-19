/**
 * Run integration tests
 *
 * Uses the `waterline-adapter-tests` module to
 * run mocha tests against the appropriate version
 * of Waterline.  Only the interfaces explicitly
 * declared in this adapter's `package.json` file
 * are tested. (e.g. `queryable`, `semantic`, etc.)
 */


/**
 * Module dependencies
 */

var util = require('util');
var mocha = require('mocha');
var TestRunner = require('waterline-adapter-tests');
var nock = require('nock');

var Adapter;
if (process.env.NODE_DEBUG === 'true') {
  Adapter = require('../../');
} else {
  Adapter = require('../../lib-cov/adapter');
}

// Grab targeted interfaces from this adapter's `package.json` file:

var interfaces = [];


var testName = '.create() test create a list';
var users = [];
var updateUsers = [];

for(var i =0; i < 10; i++){
  updateUsers.push(
    {
      path: {
        key: "something"
      },
      value : {"first_name":"update_user" + i,"last_name":"update","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-18T21:11:37.288Z"}
    }
  );
}


for(var i=0; i<4; i++) {
  users.push({ first_name: 'test_' + i, type: testName });
}

var usersFind = [
  {
    path: {
      key: "a key"
    },
    value: {
      first_name: 'find_user0',
      type: 'find test',
      age: 0,
      "createdAt":"2014-09-11T04:52:46.759Z",
      "updatedAt":"2014-09-11T04:52:46.759Z"
    }
  },
  {
    path: {
      key: "a key"
    },
    value: {
      first_name: 'find_user10',
      type: 'find test',
      age: 10,
      "createdAt":"2014-09-11T04:52:46.759Z",
      "updatedAt":"2014-09-11T04:52:46.759Z"
    }
  },
  {
    path: {
      key: "a key"
    },
    value: {
      first_name: 'find_user20',
      type: 'find test',
      age: 20,
      "createdAt":"2014-09-11T04:52:46.759Z",
      "updatedAt":"2014-09-11T04:52:46.759Z"
    }
  },
  {
    path: {
      key: "a key"
    },
    value: {
      first_name: 'find_user30',
      type: 'find test',
      age: 30,
      "createdAt":"2014-09-11T04:52:46.759Z",
      "updatedAt":"2014-09-11T04:52:46.759Z"
    }
  },
  {
    path: {
      key: "a key"
    },
    value: {
      first_name: 'find_user40',
      type: 'find test',
      age: 40,
      "createdAt":"2014-09-11T04:52:46.759Z",
      "updatedAt":"2014-09-11T04:52:46.759Z"
    }
  },
  {
    path: {
      key: "a key"
    },
    value: {
      first_name: 'find_user50',
      type: 'find test',
      age: 50,
      "createdAt":"2014-09-11T04:52:46.759Z",
      "updatedAt":"2014-09-11T04:52:46.759Z"
    }
  },
  {
    path: {
      key: "a key"
    },
    value: {
      first_name: 'find_user60',
      type: 'find test',
      age: 60,
      "createdAt":"2014-09-11T04:52:46.759Z",
      "updatedAt":"2014-09-11T04:52:46.759Z"
    }
  },
  {
    path: {
      key: "a key"
    },
    value: {
      first_name: 'find_user70',
      type: 'find test',
      age: 70,
      "createdAt":"2014-09-11T04:52:46.759Z",
      "updatedAt":"2014-09-11T04:52:46.759Z"
    }
  },
  {
    path: {
      key: "a key"
    },
    value: {
      first_name: 'find_user80',
      type: 'find test',
      age: 80,
      "createdAt":"2014-09-11T04:52:46.759Z",
      "updatedAt":"2014-09-11T04:52:46.759Z"
    }
  },
  {
    path: {
      key: "a key"
    },
    value: {
      first_name: 'find_user90',
      type: 'find test',
      age: 90,
      "createdAt":"2014-09-11T04:52:46.759Z",
      "updatedAt":"2014-09-11T04:52:46.759Z"
    }
  }
];

var fakeOrchestrate = nock('https://api.orchestrate.io')
  .defaultReplyHeaders({
    'X-Powered-By': 'Rails',
    'Content-Type': 'application/json',
    'location' : "this/is/a/generated/key"
  })
  .filteringRequestBody(/.*/, '*')
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "generated"
      },
      value : {
        first_name: 'Foo',
        favoriteFruit: 'blueberry',
        status: false,
        createdAt: '2014-09-10T07:18:18.795Z',
        updatedAt: '2014-09-10T07:18:18.795Z'
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {path: {
          key: "generated"
        },
        value : {
          first_name: 'Foo',
          favoriteFruit: 'blueberry',
          status: false,
          createdAt: '2014-09-10T07:18:18.795Z',
          updatedAt: '2014-09-10T07:18:18.795Z'
        }}
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "generated"
      },
      value : {
        "first_name":"FooBar",
        "favoriteFruit":"blueberry",
        "status":false,
        "createdAt":"2014-09-10T07:32:20.454Z",
        "updatedAt":"2014-09-10T07:32:20.454Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "generated"
          },
          value : {
            "first_name":"FooBar",
            "favoriteFruit":"blueberry",
            "status":false,
            "createdAt":"2014-09-10T07:32:20.454Z",
            "updatedAt":"2014-09-10T07:32:20.454Z"
          }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a href"
      },
      value : {
        "first_name":"FooBar",
        "favoriteFruit":"blueberry",
        "status":false,
        "createdAt":"2014-09-10T07:32:20.454Z",
        "updatedAt":"2014-09-10T07:32:20.454Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a href"
          },
          value : {
            "first_name":"FooBar",
            "favoriteFruit":"blueberry",
            "status":false,
            "createdAt":"2014-09-10T07:32:20.454Z",
            "updatedAt":"2014-09-10T07:32:20.454Z"
          }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a href"
      },
      value : {
        "first_name":"Foo",
        "last_name":"Bar",
        "favoriteFruit":"blueberry",
        "status":false,
        "createdAt":"2014-09-10T07:42:48.830Z",
        "updatedAt":"2014-09-10T07:42:48.830Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a href"
          },
          value : {
            "first_name":"Foo",
            "last_name":"Bar",
            "favoriteFruit":"blueberry",
            "status":false,
            "createdAt":"2014-09-10T07:42:48.830Z",
            "updatedAt":"2014-09-10T07:42:48.830Z"
          }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a href"
      },
      value : {
        first_name: 'Yezy',
        last_name: null,
        favoriteFruit: 'blueberry',
        status: false,
        createdAt: "Wed Sep 10 2014 00:51:16 GMT-0700 (PDT)",
        updatedAt: "Wed Sep 10 2014 00:51:16 GMT-0700 (PDT)"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a href"
          },
          value : {
            first_name: 'Yezy',
            last_name: null,
            favoriteFruit: 'blueberry',
            status: false,
            createdAt: "Wed Sep 10 2014 00:51:16 GMT-0700 (PDT)",
            updatedAt: "Wed Sep 10 2014 00:51:16 GMT-0700 (PDT)"
          }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a href"
      },
      value : {
        first_name: 'test_0',
        type: '.create() test create a list',
        favoriteFruit: 'blueberry',
        status: false,
        createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
        updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a href"
          },
          value : {
            first_name: 'test_0',
            type: '.create() test create a list',
            favoriteFruit: 'blueberry',
            status: false,
            createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
            updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a href"
      },
      value : {
        first_name: 'test_1',
        type: '.create() test create a list',
        favoriteFruit: 'blueberry',
        status: false,
        createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
        updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
      {
          path: {
            key: "a href"
          },
          value : {
            first_name: 'test_1',
            type: '.create() test create a list',
            favoriteFruit: 'blueberry',
            status: false,
            createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
            updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a href"
      },
      value : {
        first_name: 'test_2',
        type: '.create() test create a list',
        favoriteFruit: 'blueberry',
        status: false,
        createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
        updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a href"
          },
          value : {
            first_name: 'test_2',
            type: '.create() test create a list',
            favoriteFruit: 'blueberry',
            status: false,
            createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
            updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a href"
      },
      value : {
        first_name: 'test_3',
        type: '.create() test create a list',
        favoriteFruit: 'blueberry',
        status: false,
        createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
        updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a href"
          },
          value : {
            first_name: 'test_3',
            type: '.create() test create a list',
            favoriteFruit: 'blueberry',
            status: false,
            createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
            updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
        }
      ]
    };
  })
  .get('/v0/userTable?query=type%3A%20.create()%20test%20create%20a%20list&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results : [
        {
          path: {
            key: "a href"
          },
          value : {
            first_name: 'test_0',
            type: '.create() test create a list',
            favoriteFruit: 'blueberry',
            status: false,
            createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
            updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
        },
        {
          path: {
            key: "a href"
          },
          value : {
            first_name: 'test_1',
            type: '.create() test create a list',
            favoriteFruit: 'blueberry',
            status: false,
            createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
            updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
        },
        {
          path: {
            key: "a href"
          },
          value : {
            first_name: 'test_2',
            type: '.create() test create a list',
            favoriteFruit: 'blueberry',
            status: false,
            createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
            updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
        },
        {
          path: {
            key: "a href"
          },
          value : {
            first_name: 'test_3',
            type: '.create() test create a list',
            favoriteFruit: 'blueberry',
            status: false,
            createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
            updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a href"
      },
      value : {
        first_name: 'createEach_1',
        type: 'createEach',
        createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
        updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a href"
          },
          value : {
            first_name: 'createEach_1',
            type: 'createEach',
            createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
            updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body) {
    return {
      path: {
        key: "a href"
      },
      value : {
        first_name: 'createEach_2',
        type: 'createEach',
        createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
        updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
      {
          path: {
            key: "a href"
          },
          value : {
            first_name: 'createEach_2',
            type: 'createEach',
            createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
            updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
        }
      ]
    };
  })
  .get("/v0/userTable?query=type%3A%20createEach&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results: [{
          path: {
            key: "a href"
          },
          value : {
            first_name: 'createEach_1',
            type: 'createEach',
            createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
            updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
        },
        {
          path: {
            key: "a href"
          },
          value : {
            first_name: 'createEach_2',
            type: 'createEach',
            createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
            updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
        }]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a href"
      },
      value : {
        first_name: 'createEach_3',
        type: 'createEach',
        createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
        updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a href"
          },
          value : {
            first_name: 'createEach_3',
            type: 'createEach',
            createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
            updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a href"
      },
      value : {
        first_name: 'createEach_4',
        type: 'createEach',
        createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
        updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a href"
          },
          value : {
            first_name: 'createEach_4',
            type: 'createEach',
            createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
            updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a href"
      },
      value : {
        first_name: 'Destroy',
        last_name: 'Test',
        createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
        updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a href"
          },
          value : {
            first_name: 'Destroy',
            last_name: 'Test',
            createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
            updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
        }
      ]
    };
  })
  .get("/v0/userTable?query=first_name%3A%20Destroy&limit=20&offset=0")
  .reply(200, function(uri, body){
    return [{
      path: {
        key: "a href"
      },
      value : {
        first_name: 'Destroy',
        last_name: 'Test',
        createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
        updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
    }];
  })
  .delete("/v0/userTable/a%20href?purge=true")
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a href"
      },
      value : {
        first_name: 'Destroy',
        last_name: 'Test',
        createdAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)",
        updatedAt: "Wed Sep 10 2014 00:52:34 GMT-0700 (PDT)" }
    };
  })
  .get("/v0/userTable?query=first_name%3A%20Destroy&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results: []
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: 1
      },
      value : {
        first_name: 'Destroy',
        last_name: 'Test'
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 1
          },
          value : {
            first_name: 'Destroy',
            last_name: 'Test'
          }
        }
      ]
    };
  })
  .get("/v0/userTable?query=1&limit=20&offset=0")
  .reply(200, function (uri, body){
    return [{
      path: {
        key: 1
      },
      value: {
        first_name: 'Destroy',
        last_name: 'Test',
        createdAt:"2014-09-11T04:52:46.759Z",
        updatedAt:"2014-09-11T04:52:46.759Z"
      }
    }];
  })
  .delete("/v0/userTable/1?purge=true")
  .reply(200)
  .get("/v0/userTable?query=first_name%3A%20Destroy&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results: []
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a key"
      },
      value: {
        "first_name":"dummy_test",
        "favoriteFruit":"blueberry",
        "status":false,
        "createdAt":"2014-09-11T04:52:46.759Z",
        "updatedAt":"2014-09-11T04:52:46.759Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a key"
          },
          value: {
            "first_name":"dummy_test",
            "favoriteFruit":"blueberry",
            "status":false,
            "createdAt":"2014-09-11T04:52:46.759Z",
            "updatedAt":"2014-09-11T04:52:46.759Z"
          }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a key"
      },
      value: {
        "first_name":"dummy_test",
        "favoriteFruit":"blueberry",
        "status":false,
        "createdAt":"2014-09-11T04:52:46.759Z",
        "updatedAt":"2014-09-11T04:52:46.759Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a key"
          },
          value: {
            "first_name":"dummy_test",
            "favoriteFruit":"blueberry",
            "status":false,
            "createdAt":"2014-09-11T04:52:46.759Z",
            "updatedAt":"2014-09-11T04:52:46.759Z"
          }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a key"
      },
      value: {
        "first_name":"dummy_test",
        "favoriteFruit":"blueberry",
        "status":false,
        "createdAt":"2014-09-11T04:52:46.759Z",
        "updatedAt":"2014-09-11T04:52:46.759Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a key"
          },
          value: {
            "first_name":"dummy_test",
            "favoriteFruit":"blueberry",
            "status":false,
            "createdAt":"2014-09-11T04:52:46.759Z",
            "updatedAt":"2014-09-11T04:52:46.759Z"
          }
        }
      ]
    };
  })
  .get("/v0/userTable?query=*&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results: [{
        path: {
          key: "a key"
        },
        value: {
          "first_name":"dummy_test",
          "favoriteFruit":"blueberry",
          "status":false,
          "createdAt":"2014-09-11T04:52:46.759Z",
          "updatedAt":"2014-09-11T04:52:46.759Z"
        }
      },
      {
        path: {
          key: "a key"
        },
        value: {
          "first_name":"dummy_test",
          "favoriteFruit":"blueberry",
          "status":false,
          "createdAt":"2014-09-11T04:52:46.759Z",
          "updatedAt":"2014-09-11T04:52:46.759Z"
        }
      },
      {
        path: {
          key: "a key"
        },
        value: {
          "first_name":"dummy_test",
          "favoriteFruit":"blueberry",
          "status":false,
          "createdAt":"2014-09-11T04:52:46.759Z",
          "updatedAt":"2014-09-11T04:52:46.759Z"
        }
      }]
    };
  })
  .delete("/v0/userTable?force=true")
  .reply(200, function (uri, body){
    return {
      results: []
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a key"
      },
      value: {
        "first_name":"dummy_test",
        "favoriteFruit":"blueberry",
        "status":false,
        "createdAt":"2014-09-11T04:52:46.759Z",
        "updatedAt":"2014-09-11T04:52:46.759Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a key"
          },
          value: {
            "first_name":"dummy_test",
            "favoriteFruit":"blueberry",
            "status":false,
            "createdAt":"2014-09-11T04:52:46.759Z",
            "updatedAt":"2014-09-11T04:52:46.759Z"
          }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a key"
      },
      value: {
        "first_name":"dummy_test",
        "favoriteFruit":"blueberry",
        "status":false,
        "createdAt":"2014-09-11T04:52:46.759Z",
        "updatedAt":"2014-09-11T04:52:46.759Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a key"
          },
          value: {
            "first_name":"dummy_test",
            "favoriteFruit":"blueberry",
            "status":false,
            "createdAt":"2014-09-11T04:52:46.759Z",
            "updatedAt":"2014-09-11T04:52:46.759Z"
          }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a key"
      },
      value: {
        "first_name":"dummy_test",
        "favoriteFruit":"blueberry",
        "status":false,
        "createdAt":"2014-09-11T04:52:46.759Z",
        "updatedAt":"2014-09-11T04:52:46.759Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a key"
          },
          value: {
            "first_name":"dummy_test",
            "favoriteFruit":"blueberry",
            "status":false,
            "createdAt":"2014-09-11T04:52:46.759Z",
            "updatedAt":"2014-09-11T04:52:46.759Z"
          }
        }
      ]
    };
  })
  .get("/v0/userTable?query=first_name%3A%20Destroy&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results: []
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a key"
      },
      value: {
        first_name: 'find_user0',
        type: 'find test',
        age: 0,
        "createdAt":"2014-09-11T04:52:46.759Z",
        "updatedAt":"2014-09-11T04:52:46.759Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a key"
          },
          value: {
            first_name: 'find_user0',
            type: 'find test',
            age: 0,
            "createdAt":"2014-09-11T04:52:46.759Z",
            "updatedAt":"2014-09-11T04:52:46.759Z"
          }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a key"
      },
      value: {
        first_name: 'find_user10',
        type: 'find test',
        age: 10,
        "createdAt":"2014-09-11T04:52:46.759Z",
        "updatedAt":"2014-09-11T04:52:46.759Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a key"
          },
          value: {
            first_name: 'find_user0',
            type: 'find test',
            age: 0,
            "createdAt":"2014-09-11T04:52:46.759Z",
            "updatedAt":"2014-09-11T04:52:46.759Z"
          }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a key"
      },
      value: {
        first_name: 'find_user20',
        type: 'find test',
        age: 20,
        "createdAt":"2014-09-11T04:52:46.759Z",
        "updatedAt":"2014-09-11T04:52:46.759Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a key"
          },
          value: {
            first_name: 'find_user20',
            type: 'find test',
            age: 20,
            "createdAt":"2014-09-11T04:52:46.759Z",
            "updatedAt":"2014-09-11T04:52:46.759Z"
          }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a key"
      },
      value: {
        first_name: 'find_user30',
        type: 'find test',
        age: 30,
        "createdAt":"2014-09-11T04:52:46.759Z",
        "updatedAt":"2014-09-11T04:52:46.759Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a key"
          },
          value: {
            first_name: 'find_user30',
            type: 'find test',
            age: 30,
            "createdAt":"2014-09-11T04:52:46.759Z",
            "updatedAt":"2014-09-11T04:52:46.759Z"
          }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a key"
      },
      value: {
        first_name: 'find_user40',
        type: 'find test',
        age: 40,
        "createdAt":"2014-09-11T04:52:46.759Z",
        "updatedAt":"2014-09-11T04:52:46.759Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a key"
          },
          value: {
            first_name: 'find_user40',
            type: 'find test',
            age: 40,
            "createdAt":"2014-09-11T04:52:46.759Z",
            "updatedAt":"2014-09-11T04:52:46.759Z"
          }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a key"
      },
      value: {
        first_name: 'find_user50',
        type: 'find test',
        age: 50,
        "createdAt":"2014-09-11T04:52:46.759Z",
        "updatedAt":"2014-09-11T04:52:46.759Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a key"
          },
          value: {
            first_name: 'find_user50',
            type: 'find test',
            age: 50,
            "createdAt":"2014-09-11T04:52:46.759Z",
            "updatedAt":"2014-09-11T04:52:46.759Z"
          }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a key"
      },
      value: {
        first_name: 'find_user60',
        type: 'find test',
        age: 60,
        "createdAt":"2014-09-11T04:52:46.759Z",
        "updatedAt":"2014-09-11T04:52:46.759Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a key"
          },
          value: {
            first_name: 'find_user60',
            type: 'find test',
            age: 60,
            "createdAt":"2014-09-11T04:52:46.759Z",
            "updatedAt":"2014-09-11T04:52:46.759Z"
          }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a key"
      },
      value: {
        first_name: 'find_user70',
        type: 'find test',
        age: 70,
        "createdAt":"2014-09-11T04:52:46.759Z",
        "updatedAt":"2014-09-11T04:52:46.759Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a key"
          },
          value: {
            first_name: 'find_user70',
            type: 'find test',
            age: 70,
            "createdAt":"2014-09-11T04:52:46.759Z",
            "updatedAt":"2014-09-11T04:52:46.759Z"
          }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a key"
      },
      value: {
        first_name: 'find_user80',
        type: 'find test',
        age: 80,
        "createdAt":"2014-09-11T04:52:46.759Z",
        "updatedAt":"2014-09-11T04:52:46.759Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
      {
          path: {
            key: "a key"
          },
          value: {
            first_name: 'find_user80',
            type: 'find test',
            age: 80,
            "createdAt":"2014-09-11T04:52:46.759Z",
            "updatedAt":"2014-09-11T04:52:46.759Z"
          }
        }
      ]
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: "a key"
      },
      value: {
        first_name: 'find_user90',
        type: 'find test',
        age: 90,
        "createdAt":"2014-09-11T04:52:46.759Z",
        "updatedAt":"2014-09-11T04:52:46.759Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a key"
          },
          value: {
            first_name: 'find_user90',
            type: 'find test',
            age: 90,
            "createdAt":"2014-09-11T04:52:46.759Z",
            "updatedAt":"2014-09-11T04:52:46.759Z"
          }
        }
      ]
    };
  })
  .get('/v0/userTable?query=type%3A%20find%20test&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: usersFind
    };
  })
  .get('/v0/userTable?query=age%3A%2010&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a key"
          },
          value: {
            first_name: 'find_user10',
            type: 'find test',
            age: 10,
            "createdAt":"2014-09-11T04:52:46.759Z",
            "updatedAt":"2014-09-11T04:52:46.759Z"
          }
        }
      ]
    };
  })
  .get("/v0/userTable?query=age%3A%20%5B*%20TO%2049%5D&limit=20&offset=0")
  .reply(200, function (uri, body){
    var returnArr = usersFind.filter(function (el){
      return el.value.age <= 49;
    });
    return {
      results: returnArr
    };
  })
  .get('/v0/userTable?query=type%3A%20find%20test&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: usersFind
    };
  })
  .get('/v0/userTable?query=*&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: usersFind
    };
  })
  .post('/v0/userTable', '*')
  .reply(200, function (uri, body){
    return {
      path: {
        key: 100
      },
      value: {
        "first_name":"findOne test",
        "favoriteFruit":"blueberry",
        "status":false,
        "createdAt":"2014-09-11T19:53:42.903Z",
        "updatedAt":"2014-09-11T19:53:42.903Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 100
          },
          value: {
            "first_name":"findOne test",
            "favoriteFruit":"blueberry",
            "status":false,
            "createdAt":"2014-09-11T19:53:42.903Z",
            "updatedAt":"2014-09-11T19:53:42.903Z"
          }
        }
      ]
    };
  })
  .get("/v0/userTable?query=first_name%3A%20findOne%20test&limit=1&offset=0")
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a key"
          },
          value: {
            "first_name":"findOne test",
            "favoriteFruit":"blueberry",
            "status":false,
            "createdAt":"2014-09-11T19:53:42.903Z",
            "updatedAt":"2014-09-11T19:53:42.903Z"
          }
        }
      ]
    };
  })
  .get("/v0/userTable?query=first_name%3A%20findOne%20test&limit=1&offset=0")
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "a key"
          },
          value: {
            "first_name":"findOne test",
            "favoriteFruit":"blueberry",
            "status":false,
            "createdAt":"2014-09-11T19:53:42.903Z",
            "updatedAt":"2014-09-11T19:53:42.903Z"
          }
        }
      ]
    };
  })
  .get("/v0/userTable?query=first_name%3A%20findOne%20blah&limit=1&offset=0")
  .reply(200, function(uri, body){
    return null;
  })
  .get("/v0/userTable?query=100&limit=1&offset=0")
  .reply(200, function(uri, body){
    return {
      results: [
        {
          path: {
            key: 100
          },
          value: {
            "first_name":"findOne test",
            "favoriteFruit":"blueberry",
            "status":false,
            "createdAt":"2014-09-11T19:53:42.903Z",
            "updatedAt":"2014-09-11T19:53:42.903Z"
          }
        }
      ]
    };
  })
  .get("/v0/userTable?query=first_name%3A%20findOrCreate()&limit=20&offset=0")
  .reply(200, function(uri, body){
    return {
      results: []
    };
  })
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){
    return {
      path: {
        key: 500
      },
      value: {
        "first_name":"findOrCreate()",
        "favoriteFruit":"blueberry",
        "status":false,
        "createdAt":"2014-09-11T21:27:14.297Z",
        "updatedAt":"2014-09-11T21:27:14.297Z"
      }
    };
  })
  .get("/v0/userTable?query=first_name%3A%20findOrCreate()&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results : [
        {
          path: {
            key: 500
          },
          value: {
            "first_name":"findOrCreate()",
            "favoriteFruit":"blueberry",
            "status":false,
            "createdAt":"2014-09-11T21:27:14.297Z",
            "updatedAt":"2014-09-11T21:27:14.297Z"
          }
        }
      ]
    };
  })
  .get("/v0/userTable?query=first_name%3A%20findOrCreate()&limit=20&offset=0")
  .reply(200, function(uri, body){
    return {
      results : [
        {
          path: {
            key: 500
          },
          value: {
            "first_name":"findOrCreate()",
            "favoriteFruit":"blueberry",
            "status":false,
            "createdAt":"2014-09-11T21:27:14.297Z",
            "updatedAt":"2014-09-11T21:27:14.297Z"
          }
        }
      ]
    };
  })
  .get("/v0/userTable?query=first_name%3A%20model%20findOrCreate()&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results: []
    };
  })
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){
    return {
      path: {
        key: 500
      },
      value: {
        "first_name":"findOrCreate()",
        "last_name":"test",
        "favoriteFruit":"blueberry",
        "status":false,
        "createdAt":"2014-09-11T21:33:52.216Z",
        "updatedAt":"2014-09-11T21:33:52.216Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 500
          },
          value: {
            "first_name":"findOrCreate()",
            "last_name":"test",
            "favoriteFruit":"blueberry",
            "status":false,
            "createdAt":"2014-09-11T21:33:52.216Z",
            "updatedAt":"2014-09-11T21:33:52.216Z"
          }
        }
      ]
    };
  })
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){
    return {
      path: {
        key: 500
      },
      value: {
        "first_name":"model findOrCreate()",
        "last_name":"test",
        "favoriteFruit":"blueberry",
        "status":false,
        "createdAt":"2014-09-11T21:33:52.216Z",
        "updatedAt":"2014-09-11T21:33:52.216Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 500
          },
          value: {
            "first_name":"model findOrCreate()",
            "last_name":"test",
            "favoriteFruit":"blueberry",
            "status":false,
            "createdAt":"2014-09-11T21:33:52.216Z",
            "updatedAt":"2014-09-11T21:33:52.216Z"
          }
        }
      ]
    };
  })
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){
    return {
      path: {
        key: 500
      },
      value: {"first_name":"findOrCreate_1","type":"findOrCreateEach([])","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-15T00:20:41.608Z","updatedAt":"2014-10-15T00:20:41.608Z"}
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 500
          },
          value: {"first_name":"findOrCreate_1","type":"findOrCreateEach([])","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-15T00:20:41.608Z","updatedAt":"2014-10-15T00:20:41.608Z"}
        }
      ]
    };
  })
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 500
          },
          value: {"first_name":"findOrCreate_2","type":"findOrCreateEach([])","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-15T00:22:51.052Z","updatedAt":"2014-10-15T00:22:51.052Z"}
        }
      ]
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 500
          },
          value: {"first_name":"findOrCreate_2","type":"findOrCreateEach([])","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-15T00:22:51.052Z","updatedAt":"2014-10-15T00:22:51.052Z"}
        }
      ]
    };
  })
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 500
          },
          value: {"first_name":"findOrCreate_3","type":"findOrCreateEach([])","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-15T00:22:51.052Z","updatedAt":"2014-10-15T00:22:51.052Z"}
        }
      ]
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 500
          },
          value: {"first_name":"findOrCreate_3","type":"findOrCreateEach([])","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-15T00:22:51.052Z","updatedAt":"2014-10-15T00:22:51.052Z"}
        }
      ]
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 500
          },
          value: {"first_name":"findOrCreate_3","type":"findOrCreateEach([])","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-15T00:22:51.052Z","updatedAt":"2014-10-15T00:22:51.052Z"}
        }
      ]
    };
  })
  .get("/v0/userTable?query=type%3A%20findOrCreateEach(%5B%5D)%20AND%20first_name%3A%20NOT%20IN%20THE%20SET&limit=1&offset=0")
  .reply(200, function (uri, body){
    return {
      results : []
    };
  })
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){
    return {
      path: {
        key: 1000
      },
      value: {
        "first_name":"NOT IN THE SET",
        "type":"findOrCreateEach([])",
        "favoriteFruit":"blueberry",
        "status":false,
        "createdAt":"2014-09-11T23:29:08.287Z",
        "updatedAt":"2014-09-11T23:29:08.287Z"
      }
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
      {
          path: {
            key: 1000
          },
          value: {
            "first_name":"NOT IN THE SET",
            "type":"findOrCreateEach([])",
            "favoriteFruit":"blueberry",
            "status":false,
            "createdAt":"2014-09-11T23:29:08.287Z",
            "updatedAt":"2014-09-11T23:29:08.287Z"
          }
        }
      ]
    };
  })
  .get("/v0/userTable?query=type%3A%20findOrCreateEach(%5B%5D)%20AND%20first_name%3A%20NOT%20IN%20THE%20SET&limit=1&offset=0")
  .reply(200, function (uri, body){
    return {
      results : [
        {
          path: {
            key: 1000
          },
          value: {
            "first_name":"NOT IN THE SET",
            "type":"findOrCreateEach([])",
            "favoriteFruit":"blueberry",
            "status":false,
            "createdAt":"2014-09-11T23:29:08.287Z",
            "updatedAt":"2014-09-11T23:29:08.287Z"
          }
        }
      ]
    };
  })
  .get("/v0/userTable?query=first_name%3A%20NOT%20IN%20THE%20SET&limit=20&offset=0")
  .reply(200, function(uri, body){
    return {
      results : [
        {
          path: {
            key: 1000
          },
          value: {
            "first_name":"NOT IN THE SET",
            "type":"findOrCreateEach([])",
            "favoriteFruit":"blueberry",
            "status":false,
            "createdAt":"2014-09-11T23:29:08.287Z",
            "updatedAt":"2014-09-11T23:29:08.287Z"
          }
        }
      ]
    };
  })
  .get("/v0/userTable?query=type%3A%20findOrCreateEach(%5B%5D)%20AND%20first_name%3A%20NOT%20IN%20THE%20SET&limit=1&offset=0")
  .reply(200, function(uri, body){
    return {
      results : [
        {
          path: {
            key: 1000
          },
          value: {
            "first_name":"NOT IN THE SET",
            "type":"findOrCreateEach([])",
            "favoriteFruit":"blueberry",
            "status":false,
            "createdAt":"2014-09-11T23:29:08.287Z",
            "updatedAt":"2014-09-11T23:29:08.287Z"
          }
        }
      ]
    };
  })
  /** array type **/
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){
    return {
      path: {
        key: "key"
      },
      value: {"favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-15T00:53:11.646Z","updatedAt":"2014-10-15T00:53:11.646Z","arrList":[0,1,2,3]}
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "key"
          },
          value: {"favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-15T00:53:11.646Z","updatedAt":"2014-10-15T00:53:11.646Z","arrList":[0,1,2,3]}
        }
      ]
    };
  })
  /** boolean type **/
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){
    return {
      path: {
        key: "key"
      },
      value: {"favoriteFruit":"blueberry","status":true,"createdAt":"2014-10-15T00:53:11.646Z","updatedAt":"2014-10-15T00:53:11.646Z","arrList":[0,1,2,3]}
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "key"
          },
          value: {"favoriteFruit":"blueberry","status":true,"createdAt":"2014-10-15T00:53:11.646Z","updatedAt":"2014-10-15T00:53:11.646Z","arrList":[0,1,2,3]}
        }
      ]
    };
  })
  /** date type - works even though it fails **/
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){
    return {
      path: {
        key: "key"
      },
      value: {"dob":"2014-10-15T00:59:04.626Z","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-15T00:59:04.626Z","updatedAt":"2014-10-15T00:59:04.626Z"}
    };
  })
  .get('/v0/userTable?query=generated&limit=20&offset=0')
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: "key"
          },
          value: {"dob":"2014-10-15T00:59:04.626Z","favoriteFruit":"blueberry","status": true,"createdAt":"2014-10-15T00:59:04.626Z","updatedAt":"2014-10-15T00:59:04.626Z"}
        }
      ]
    };
  })
  /** float type **/
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){

  })
  .get("/v0/userTable?query=generated&limit=20&offset=0")
  .reply(200, function(uri, body){
    return {
      results: [
        {
          path: {
            key: "key"
          },
          value: {"percent":0.001,"favoriteFruit":"blueberry","status": true, "createdAt":"2014-10-18T04:54:03.387Z","updatedAt":"2014-10-18T04:54:03.387Z"}
        }
      ]
    };
  })
  /** integer type **/
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){

  })
  .get("/v0/userTable?query=generated&limit=20&offset=0")
  .reply(200, function(uri, body){
    return {
      results: [
        {
          path: {
            key: "key"
          },
          value: {"age":27,"favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T20:12:14.060Z","updatedAt":"2014-10-18T20:12:14.060Z"}
        }
      ]
    };
  })

  /** object type **/

  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){

  })
  .get("/v0/userTable?query=generated&limit=20&offset=0")
  .reply(200, function(uri, body){
    return {
      results: [
        {
          path: {
            key: "key"
          },
          value: {"obj":{"foo":"bar"},"favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T20:14:36.747Z","updatedAt":"2014-10-18T20:14:36.747Z"}
        }
      ]
    };
  })
  /** string type test **/
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){

  })
  .get("/v0/userTable?query=generated&limit=20&offset=0")
  .reply(200, function(uri, body){
    return {
      results: [
        {
          path: {
            key: "key"
          },
          value: {"first_name":"Foo","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T20:15:59.588Z","updatedAt":"2014-10-18T20:15:59.588Z"}
        }
      ]
    };
  })

  /**
    * Test Type - Update
    * updating records nock mapping
    */
  .get("/v0/userTable?query=*&limit=20&offset=0")
  .reply(200, function(uri, body){
    return {
      results: [
        {
          path: {
            key: "key"
          },
          value: {"first_name":"Foo","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T20:15:59.588Z","updatedAt":"2014-10-18T20:15:59.588Z"}
        }
      ]
    };
  })
  .delete("/v0/userTable?force=true")
  .reply(200, function(uri, body){

  })
  /**
    *
    * before all create
    */
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){})
  .get("/v0/userTable?query=generated&limit=20&offset=0")
  .reply(200, function(uri, body){
    return {
      results: [
        {
          path: {
            key: 1
          },
          value: {"first_name":"update_user0","last_name":"update","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-18T21:11:37.288Z"}
        }
      ]
    };
  })
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){})
  .get("/v0/userTable?query=generated&limit=20&offset=0")
  .reply(200, function(uri, body){
    return {
      results: [
        {
          path: {
            key: 2
          },
          value: {"first_name":"update_user1","last_name":"update","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-18T21:11:37.288Z"}
        }
      ]
    };
  })
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){})
  .get("/v0/userTable?query=generated&limit=20&offset=0")
  .reply(200, function(uri, body){
    return {
      results: [
        {
          path: {
            key: 3
          },
          value: {"first_name":"update_user2","last_name":"update","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-18T21:11:37.288Z"}
        }
      ]
    };
  })
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){})
  .get("/v0/userTable?query=generated&limit=20&offset=0")
  .reply(200, function(uri, body){
    return {
      results: [
        {
          path: {
            key: 4
          },
          value: {"first_name":"update_user3","last_name":"update","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-18T21:11:37.288Z"}
        }
      ]
    };
  })
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){})
  .get("/v0/userTable?query=generated&limit=20&offset=0")
  .reply(200, function(uri, body){
    return {
      results: [
        {
          path: {
            key: 5
          },
          value: {"first_name":"update_user4","last_name":"update","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-18T21:11:37.288Z"}
        }
      ]
    };
  })
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){})
  .get("/v0/userTable?query=generated&limit=20&offset=0")
  .reply(200, function(uri, body){
    return {
      results: [
        {
          path: {
            key: 6
          },
          value: {"first_name":"update_user5","last_name":"update","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-18T21:11:37.288Z"}
        }
      ]
    };
  })
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){})
  .get("/v0/userTable?query=generated&limit=20&offset=0")
  .reply(200, function(uri, body){
    return {
      results: [
        {
          path: {
            key: 7
          },
          value: {"first_name":"update_user6","last_name":"update","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-18T21:11:37.288Z"}
        }
      ]
    };
  })
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){})
  .get("/v0/userTable?query=generated&limit=20&offset=0")
  .reply(200, function(uri, body){
    return {
      results: [
        {
          path: {
            key: 8
          },
          value: {"first_name":"update_user7","last_name":"update","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-18T21:11:37.288Z"}
        }
      ]
    };
  })
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){})
  .get("/v0/userTable?query=generated&limit=20&offset=0")
  .reply(200, function(uri, body){
    return {
      results: [
        {
          path: {
            key: 9
          },
          value: {"first_name":"update_user8","last_name":"update","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-18T21:11:37.288Z"}
        }
      ]
    };
  })
  .post("/v0/userTable", "*")
  .reply(200, function (uri, body){})
  .get("/v0/userTable?query=generated&limit=20&offset=0")
  .reply(200, function(uri, body){
    return {
      results: [
        {
          path: {
            key: 10
          },
          value: {"first_name":"update_user9","last_name":"update","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-18T21:11:37.288Z"}
        }
      ]
    };
  })
  .get("/v0/userTable?query=type%3A%20update&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results: updateUsers
    };
  })
  .put("/v0/userTable/something", "*")
  .reply(200, function (uri, body){

  })
  .get("/v0/userTable?query=something&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results : [
        {
          path: {
            key: "akeyofsomekind"
          },
          value: {"first_name":"update_user0","last_name":"updated","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-19T00:28:11.393Z"}
        }
      ]
    };
  })
  .put("/v0/userTable/something", "*")
  .reply(200, function (uri, body){

  })
  .get("/v0/userTable?query=something&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results : [
        {
          path: {
            key: "akeyofsomekind"
          },
          value: {"first_name":"update_user1","last_name":"updated","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-19T00:28:11.393Z"}
        }
      ]
    };
  })
  .put("/v0/userTable/something", "*")
  .reply(200, function (uri, body){

  })
  .get("/v0/userTable?query=something&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results : [
        {
          path: {
            key: "akeyofsomekind"
          },
          value: {"first_name":"update_user2","last_name":"updated","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-19T00:28:11.393Z"}
        }
      ]
    };
  })
  .put("/v0/userTable/something", "*")
  .reply(200, function (uri, body){

  })
  .get("/v0/userTable?query=something&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results : [
        {
          path: {
            key: "akeyofsomekind"
          },
          value: {"first_name":"update_user3","last_name":"updated","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-19T00:28:11.393Z"}
        }
      ]
    };
  })
  .put("/v0/userTable/something", "*")
  .reply(200, function (uri, body){

  })
  .get("/v0/userTable?query=something&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results : [
        {
          path: {
            key: "akeyofsomekind"
          },
          value: {"first_name":"update_user4","last_name":"updated","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-19T00:28:11.393Z"}
        }
      ]
    };
  })
  .put("/v0/userTable/something", "*")
  .reply(200, function (uri, body){

  })
  .get("/v0/userTable?query=something&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results : [
        {
          path: {
            key: "akeyofsomekind"
          },
          value: {"first_name":"update_user5","last_name":"updated","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-19T00:28:11.393Z"}
        }
      ]
    };
  })
  .put("/v0/userTable/something", "*")
  .reply(200, function (uri, body){

  })
  .get("/v0/userTable?query=something&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results : [
        {
          path: {
            key: "akeyofsomekind"
          },
          value: {"first_name":"update_user6","last_name":"updated","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-19T00:28:11.393Z"}
        }
      ]
    };
  })
  .put("/v0/userTable/something", "*")
  .reply(200, function (uri, body){

  })
  .get("/v0/userTable?query=something&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results : [
        {
          path: {
            key: "akeyofsomekind"
          },
          value: {"first_name":"update_user7","last_name":"updated","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-19T00:28:11.393Z"}
        }
      ]
    };
  })
  .put("/v0/userTable/something", "*")
  .reply(200, function (uri, body){

  })
  .get("/v0/userTable?query=something&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results : [
        {
          path: {
            key: "akeyofsomekind"
          },
          value: {"first_name":"update_user8","last_name":"updated","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-19T00:28:11.393Z"}
        }
      ]
    };
  })
  .put("/v0/userTable/something", "*")
  .reply(200, function (uri, body){

  })
  .get("/v0/userTable?query=something&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results : [
        {
          path: {
            key: "akeyofsomekind"
          },
          value: {"first_name":"update_user9","last_name":"updated","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-19T00:28:11.393Z"}
        }
      ]
    };
  })
  .get("/v0/userTable?query=type%3A%20update&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results : [
        {
          path: {
            key: "akeyofsomekind"
          },
          value: {"first_name":"update_user0","last_name":"updated","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-19T00:28:11.393Z"}
        }
      ]
    };
  })
  .put("/v0/userTable/akeyofsomekind", '*')
  .reply(200, function (uri, body){
    return {
      results : [
        {
          path: {
            key: "akeyofsomekind"
          },
          value: {"first_name":"update_user0","last_name":"updated again","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-19T22:22:36.006Z"}
        }
      ]
    };
  })
  .get("/v0/userTable?query=akeyofsomekind&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results : [
        {
          path: {
            key: "akeyofsomekind"
          },
          value: {"first_name":"update_user0","last_name":"updated again","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-19T22:22:36.006Z"}
        }
      ]
    };
  })
  .get("/v0/userTable?query=1&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results : [
        {
          path: {
            key: "akeyofsomekind"
          },
          value: {"first_name":"foo","last_name":"updated again","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-19T22:22:36.006Z"}
        }
      ]
    };
  })
  .put("/v0/userTable/akeyofsomekind", '*')
  .reply(200, function (uri, body){
    return {
      results : [
        {
          path: {
            key: 1
          },
          value: {"first_name":"foo","last_name":"updated again","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-19T22:56:13.488Z"}
        }
      ]
    };
  })
  .get("/v0/userTable?query=akeyofsomekind&limit=20&offset=0")
  .reply(200, function (uri, body){

    return {
      results : [
        {
          path: {
            key: 1
          },
          value: {"first_name":"foo","last_name":"updated again","type":"update","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-19T22:22:36.006Z"}
        }
      ]
    };
  })
  .get("/v0/userTable?query=*&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results : updateUsers
    };
  })
  /** puts for update of the empty object **/
  .put("/v0/userTable/something", "*")
  .reply(200, function(uri, body){

  })
  .put("/v0/userTable/something", "*")
  .reply(200, function(uri, body){

  })
  .put("/v0/userTable/something", "*")
  .reply(200, function(uri, body){

  })
  .put("/v0/userTable/something", "*")
  .reply(200, function(uri, body){

  })
  .put("/v0/userTable/something", "*")
  .reply(200, function(uri, body){

  })
  .put("/v0/userTable/something", "*")
  .reply(200, function(uri, body){

  })
  .put("/v0/userTable/something", "*")
  .reply(200, function(uri, body){

  })
  .put("/v0/userTable/something", "*")
  .reply(200, function(uri, body){

  })
  .put("/v0/userTable/something", "*")
  .reply(200, function(uri, body){

  })
  .put("/v0/userTable/something", "*")
  .reply(200, function(uri, body){

  })
  .get("/v0/userTable?query=something&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 200
          },
          value : {"first_name":"update_user0","last_name":"update","type":"update all","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-20T18:41:38.065Z"}
        }
      ]
    };
  })
  .get("/v0/userTable?query=something&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 200
          },
          value : {"first_name":"update_user0","last_name":"update","type":"update all","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-20T18:41:38.065Z"}
        }
      ]
    };
  })
  .get("/v0/userTable?query=something&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 200
          },
          value : {"first_name":"update_user0","last_name":"update","type":"update all","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-20T18:41:38.065Z"}
        }
      ]
    };
  })
  .get("/v0/userTable?query=something&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 200
          },
          value : {"first_name":"update_user0","last_name":"update","type":"update all","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-20T18:41:38.065Z"}
        }
      ]
    };
  })
  .get("/v0/userTable?query=something&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 200
          },
          value : {"first_name":"update_user0","last_name":"update","type":"update all","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-20T18:41:38.065Z"}
        }
      ]
    };
  })
  .get("/v0/userTable?query=something&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 200
          },
          value : {"first_name":"update_user0","last_name":"update","type":"update all","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-20T18:41:38.065Z"}
        }
      ]
    };
  })
  .get("/v0/userTable?query=something&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 200
          },
          value : {"first_name":"update_user0","last_name":"update","type":"update all","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-20T18:41:38.065Z"}
        }
      ]
    };
  })
  .get("/v0/userTable?query=something&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 200
          },
          value : {"first_name":"update_user0","last_name":"update","type":"update all","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-20T18:41:38.065Z"}
        }
      ]
    };
  })
  .get("/v0/userTable?query=something&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 200
          },
          value : {"first_name":"update_user0","last_name":"update","type":"update all","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-20T18:41:38.065Z"}
        }
      ]
    };
  })
  .get("/v0/userTable?query=something&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 200
          },
          value : {"first_name":"update_user0","last_name":"update","type":"update all","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-20T18:41:38.065Z"}
        }
      ]
    };
  })
  .get("/v0/userTable?query=1&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 1
          },
          value : {"first_name":"update_user0","last_name":"update","type":"update all","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-20T18:41:38.065Z"}
        }
      ]
    };
  })
  .put("/v0/userTable/1")
  .reply(200, function (uri, body){

  })
  .get("/v0/userTable?query=1&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results : [
        {
          path: {
            key: 1
          },
          value: {"first_name":"update_user0","last_name":"update","type":"update all","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-18T21:11:37.288Z","updatedAt":"2014-10-20T18:51:57.983Z","age":null}
        }
      ]
    };
  })
  .post("/v0/userTable")
  .reply(200, function (uri, body){

  })
  .post("/v0/userTable")
  .reply(200, function (uri, body){

  })
  .get("/v0/userTable?query=generated&limit=20&offset=0")
  .reply(200, function(uri, body){
    return {
      results: [
        {
          path: {
            key: 200
          },
          value: {"first_name":"update_find_user0","last_name":"update","type":"updateFind","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-20T20:01:03.531Z","updatedAt":"2014-10-20T20:01:03.531Z"}
        }
      ]
    };
  })
  .get("/v0/userTable?query=generated&limit=20&offset=0")
  .reply(200, function(uri, body){
    return {
      results: [
        {
          path: {
            key: 200
          },
          value: {"first_name":"update_find_user1","last_name":"update","type":"updateFind","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-20T20:01:03.531Z","updatedAt":"2014-10-20T20:01:03.531Z"}
        }
      ]
    };
  })
  .get("/v0/userTable?query=type%3A%20updateFind&limit=20&offset=0")
  .reply(200, function(uri, body){
    return {
      results: [
        {
          path: {
            key: 200
          },
          value: {"first_name":"update_find_user0","last_name":"update","type":"updateFind","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-20T20:01:03.531Z","updatedAt":"2014-10-20T20:01:03.531Z"}
        },
        {
          path: {
            key: 200
          },
          value: {"first_name":"update_find_user1","last_name":"update","type":"updateFind","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-20T20:01:03.531Z","updatedAt":"2014-10-20T20:01:03.531Z"}
        }
      ]
    };
  })
  .put("/v0/userTable/200")
  .reply(200, function (uri, body){

  })
  .put("/v0/userTable/200")
  .reply(200, function (uri, body){

  })
  .get("/v0/userTable?query=200&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 200
          },
          value: {"first_name":"update_find_user0","last_name":"update","type":"updateFind","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-20T20:01:03.531Z","updatedAt":"2014-10-20T20:01:03.531Z"}
        }
      ]
    };
  })
  .get("/v0/userTable?query=200&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 200
          },
          value: {"first_name":"update_find_user1","last_name":"update","type":"updateFind","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-20T20:01:03.531Z","updatedAt":"2014-10-20T20:01:03.531Z"}
        }
      ]
    };
  })
  .get("/v0/userTable?query=type%3A%20updateFind&limit=20&offset=0")
  .reply(200, function (uri, body){
    return {
      results: [
        {
          path: {
            key: 200
          },
          value: {"first_name":"update_find_user0","last_name":"Updated Find","type":"updateFind","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-20T20:01:03.531Z","updatedAt":"2014-10-20T20:01:03.531Z"}
        },
        {
          path: {
            key: 200
          },
          value: {"first_name":"update_find_user1","last_name":"Updated Find","type":"updateFind","favoriteFruit":"blueberry","status":false,"createdAt":"2014-10-20T20:01:03.531Z","updatedAt":"2014-10-20T20:01:03.531Z"}
        }
      ]
    };
  });

/**
 * Integration Test Runner
 *
 * Uses the `waterline-adapter-tests` module to
 * run mocha tests against the specified interfaces
 * of the currently-implemented Waterline adapter API.
 */
new TestRunner({

    // Load the adapter module.
    adapter: Adapter,

    // Default adapter config to use.
    config: {
        schema: false,
        status: "dev",
        developmentkey: 'test_token'
    },

    // The set of adapter interfaces to test against.
    // (grabbed these from this adapter's package.json file above)
    interfaces: ['semantic']

    // Most databases implement 'semantic' and 'queryable'.
    //
    // As of Sails/Waterline v0.10, the 'associations' interface
    // is also available.  If you don't implement 'associations',
    // it will be polyfilled for you by Waterline core.  The core
    // implementation will always be used for cross-adapter / cross-connection
    // joins.
    //
    // In future versions of Sails/Waterline, 'queryable' may be also
    // be polyfilled by core.
    //
    // These polyfilled implementations can usually be further optimized at the
    // adapter level, since most databases provide optimizations for internal
    // operations.
    //
    // Full interface reference:
    // https://github.com/balderdashy/sails-docs/blob/master/adapter-specification.md
});
