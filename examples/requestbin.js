/**
 * @title Dump rule variables to RequestBin
 * @overview Shows how to post the variables sent to your Rule to RequestBin to help troubleshoot rule issues
 * @gallery true
 * @category debugging
 *
 * This rule shows how to post the variables sent to your Rule to [RequestBin](https://requestbin.fullcontact.com) to help troubleshoot issues with your Rules.
 *
 * > Note: Auth0 provides [native mechanisms for debugging rules](https://auth0.com/docs/rules/current#how-to-debug-rules). Should you still desire to send internal rule variables to a third-party service, you should deactivate this rule or comment out the code once you are finished troubleshooting.
 *
 *
 * You can run this rule by itself, or paste it into an existing rule.
 *
 */
function dumpRules(user, context, callback) {
  // https://auth0.com/docs/rules/current/context
  const context_whitelist = ['clientID', 'connection', 'stats'];
  const context_filtered = _.pick(context, context_whitelist);
  request.post({
    url: configuration.requestBinUrl,
    json: {
      user: global.safe_user,
      context: context_filtered,
    },
    timeout: 15000
  }, function(err, response, body) {
    if (err) return callback(err);
    return callback(null, user, context);
  });
}
