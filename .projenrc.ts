import { awscdk } from 'projen';
import { NodePackageManager, NpmAccess } from 'projen/lib/javascript';
import { ReleaseTrigger } from 'projen/lib/release';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'BeeSolve s.r.o.',
  authorAddress: 'support@beesolve.com',
  cdkVersion: '2.231.0',
  constructsVersion: '10.4.3',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.9.0',
  name: '@beesolve/lambda-keep-active',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/beesolve/lambda-keep-active',
  description:
    'CDK construct which prevents your Lambda functions to transition into `inactive` state.',
  peerDeps: ['aws-cdk-lib@^2.231.0', 'constructs@^10.4.3'],
  devDeps: [
    'aws-cdk-lib@2.231.0',
    'constructs@10.4.3',
    '@aws-sdk/client-lambda@^3.943.0',
    '@aws-sdk/client-resource-groups-tagging-api@^3.943.0',
    'yaml@^2.8.1',
  ],
  packageName: '@beesolve/lambda-keep-active',
  packageManager: NodePackageManager.BUN,
  authorOrganization: true,
  lambdaOptions: {
    runtime: awscdk.LambdaRuntime.NODEJS_24_X,
  },
  majorVersion: 1,
  npmAccess: NpmAccess.PUBLIC,
  releaseToNpm: true,
  releaseTrigger: ReleaseTrigger.manual(),
});

project.package.addField('volta', {
  node: '24.11.1',
});

project.synth();
