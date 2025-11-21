# 1.0.5

- fix infinite loop over tagged resources
- change handler extension to .mjs so Lambda can run it correctly as module

# 1.0.4

- fix: handler.js is build without @aws-sdk
- fix: lambda handler in cdk only includes code for handler.js

# 1.0.3

- fix: make sure `__dirname` works in ESM

# 1.0.2

- chore: upgrade dependencies

# 1.0.1

- make `LambdaKeepActive` props optional

# 1.0.0

- initial release
- construct for tagging Lambda functions which should be kept active
- runtime for processing keep active "ping"
