var vm = require('vm'),
  _ = require('lodash');


var requireWithVersionSupport = (moduleName) => {
  // moduleName = mongo@2.1
  var name = moduleName.split('@')[0];
  // versioned import of libraries defaults to available
  // version installed in the running environment
  return require(name);
};


var runInLocalSandbox = (ruleScripts, user, context, configuration) => {

  var asRunnable = (script) => `(${script}).call(null, user, context, callback)`;

  var globalContext = {
    global: {}
  };

  require('auth0-authz-rules-api').extend(globalContext);

  var sandboxContext = Object.assign(globalContext, {
    user: Object.freeze(user),
    context: Object.freeze(context),
    require: requireWithVersionSupport,
    configuration: configuration || {}
  });

  return new Promise((ok, fail) => {

    var runScripts = (scripts, sharedContext) => {
      // run all the scripts in series recursively by sharing
      // the context (`sharedContext`)

      var head = _.head(scripts);

      // if no head we ran all the rules
      if (head === undefined) {
        // resolve the promise
        ok();
      } else {
        // the shared context to use immutable contexts between rules
        var vmContext = vm.createContext(Object.assign(sharedContext, {
          // set the callback that is called on completion (success/fail) of every rule
          callback: (error, user, context) => {

            if (error) {
              // fail early and return if any of the rule fails preventing further execution
              fail(error);
            } else {
              // in case of no error, process the rest of the rules
              runScripts(_.drop(scripts), sharedContext);
            }
          }
        }));

        (new vm.Script(asRunnable(head))).runInContext(vmContext);
      }
    };

    runScripts(ruleScripts, sandboxContext);
  });

};

module.exports = runInLocalSandbox;
