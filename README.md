# What is it?

The *auth0-rules-local-testharness* library provides an easy way to deploy, execute, and test the output of `Auth0 Rules` using a local sandbox environment. It is very simple to use, and requires under 5 minutes to get started testing your Auth0 Rules! 

You should write your `Auth0 Rules` and add them to this project (similar to the `/examples/requestbin.js` which is an example `Auth0 Rule`) and then write tests against the new rules you added. This style of usage can be seen in `/test/test.sample.js`. After your tests have been writen simple run `npm i` and then `npm run test` or `npm run tdd`. 

See here for further documentation on [Auth0 Rules](https://auth0.com/docs/rules).

This package helps the developers to test their rules in their local development environment or in a CI environment instead of testing them against the real rules engine. This package exposes just one method, `runInLocalSandbox` which can be called to run the rule in an emulator similar to that of the Auth0's rules engine. It piggy backs on nodejs `vm` package to do it.

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, among others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free Auth0 Account

1. Go to [Auth0](https://auth0.com/signup) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.

## Disclaimer

This library is not officially supported.

