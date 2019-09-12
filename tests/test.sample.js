'use strict';

var expect = require('chai').expect;
var runInLocalSandbox = require('../');
var nock = require('nock');

var user = {
  "email": "first.last@auth0.com",
  "email_verified": true,
  "name": "Test user",
  "given_name": "Test",
  "family_name": "User",
  "created_at": "2019-03-09T09:00.000Z",
  "last_login": "2019-03-09T10:00:27.000Z",
  "logins_count": 4
};

var context = {
  "clientID": "test-client-id",
  "clientName": "Test client",
  "connection": "Test Connection",
  "connectionStrategy": "auth0",
  "protocol": "oidc-basic-profile",
  "stats": {"loginsCount": 1}
};

var configuration = {
  requestBinUrl: 'http://requestbin.fullcontact.com/auth0-rule-test'
};


describe('auth0-requestbin', function () {
  var body = {
    'user': {'email': user.email, 'email_verified': user.email_verified},
    'context': {'clientID': context.clientID, 'connection': context.connection,
                'stats': context.stats}
  };
  var script = require('fs').readFileSync('./examples/requestbin.js');


  it('should post to request bin successfully', function (done) {
     nock(configuration.requestBinUrl).post('', body).reply(200);

      var callback = function (err, response, context) {
        expect(response).to.be.equal(user);
        done(err);
      }

      runInLocalSandbox(script, [user, context, callback], configuration);
    });

  it('should fail to post to request bin', function (done) {
    nock(configuration.requestBinUrl).post('', body).reply(500);

    var callback = function (err, response, context) {
      expect(err).to.be.null;
      done();
    };

    runInLocalSandbox(script, [user, context, callback], configuration);
  });
})
