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
  "stats": {
    "loginsCount": 1
  }
};
var configuration = {
  requestBinUrl: 'http://requestbin.fullcontact.com/auth0-rule-test',
  clientId: process.env.clientID,
  clientSecret: process.env.clientSecret,
  domain: process.env.Auth0Domain
};
describe('auth0-requestbin', function () {
  this.timeout(3 * 1000);
  var body = {
    'user': {
      'email': user.email,
      'email_verified': user.email_verified
    },
    'context': {
      'clientID': context.clientID,
      'connection': context.connection,
      'stats': context.stats
    }
  };
  var script1 = require('fs').readFileSync('./examples/auth0-helper.js');
  var script2 = require('fs').readFileSync('./examples/requestbin.js');
  it('should set global object successfully', async function () {
    var scope = nock(configuration.requestBinUrl).post('', body).reply(200),
      slowScope = nock('http://slowly.com').post('/delay/1second').delay(1000).reply(204);
    await runInLocalSandbox([script1, script2], user, context, configuration);
    expect(slowScope.isDone()).to.be.true;
    expect(scope.isDone()).to.be.true;
  });
  it('should fail to move to next rule if first fails', async function () {
    var scope = nock(configuration.requestBinUrl).post('', body).reply(200),
      slowScope = nock('http://slowly.com').post('/delay/1second').delay(1000).reply(500)
    try {
      await runInLocalSandbox([script1, script2], user, context, configuration);
    } catch (e) {
      expect(e.message).to.be.equal("Failed posting");
    } finally {
      expect(slowScope.isDone()).to.be.true;
      expect(scope.isDone()).to.be.false;
    }
  });
});
