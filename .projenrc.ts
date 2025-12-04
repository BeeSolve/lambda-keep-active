import { awscdk } from "projen";
import { NodePackageManager, NpmAccess } from "projen/lib/javascript";
import { ReleaseTrigger } from "projen/lib/release";

const project = new awscdk.AwsCdkConstructLibrary({
  author: "BeeSolve s.r.o.",
  authorAddress: "support@beesolve.com",
  authorOrganization: true,
  cdkVersion: "2.231.0",
  clobber: false,
  constructsVersion: "10.4.3",
  defaultReleaseBranch: "main",
  devDeps: [
    "aws-cdk-lib@2.231.0",
    "constructs@10.4.3",
    "@aws-sdk/client-lambda@^3.943.0",
    "@aws-sdk/client-resource-groups-tagging-api@^3.943.0",
    "yaml@^2.8.1",
  ],
  description:
    "CDK construct which prevents your Lambda functions to transition into `inactive` state.",
  jest: false,
  jsiiVersion: "~5.9.0",
  keywords: ["aws", "lambda", "active"],
  lambdaOptions: {
    runtime: awscdk.LambdaRuntime.NODEJS_24_X,
  },
  license: "MIT",
  majorVersion: 1,
  name: "@beesolve/lambda-keep-active",
  npmAccess: NpmAccess.PUBLIC,
  packageManager: NodePackageManager.BUN,
  peerDeps: ["aws-cdk-lib@^2.231.0", "constructs@^10.4.3"],
  prettier: true,
  projenrcTs: true,
  repositoryUrl: "https://github.com/beesolve/lambda-keep-active",
  releaseToNpm: true,
  releaseTrigger: ReleaseTrigger.manual(),
  vscode: false,
});

project.package.addField("volta", {
  node: "24.11.1",
});

project.synth();
