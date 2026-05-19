import { awscdk, JsonPatch } from "projen";
import { NodePackageManager, NpmAccess } from "projen/lib/javascript";
import { ReleaseTrigger } from "projen/lib/release";

const project = new awscdk.AwsCdkConstructLibrary({
  author: "BeeSolve s.r.o.",
  authorAddress: "support@beesolve.com",
  authorOrganization: true,
  cdkVersion: "2.235.1",
  clobber: false,
  constructsVersion: "10.4.5",
  defaultReleaseBranch: "main",
  devDeps: [
    "aws-cdk-lib@2.235.1",
    "constructs@10.4.5",
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
  npmTrustedPublishing: true,
  packageManager: NodePackageManager.BUN,
  peerDeps: ["aws-cdk-lib@^2.231.0", "constructs@^10.4.3"],
  prettier: true,
  projenrcTs: true,
  repositoryUrl: "git+https://github.com/BeeSolve/lambda-keep-active",
  releaseToNpm: true,
  releaseTrigger: ReleaseTrigger.continuous(),
  vscode: false,
});

const releaseWorkflow = project.tryFindObjectFile(
  ".github/workflows/release.yml",
);
if (releaseWorkflow) {
  // The release job uses bun but has no setup-node, so jsii falls back to the
  // runner's pre-installed Node 20. Insert Node 24 setup before bun setup.
  releaseWorkflow.patch(
    JsonPatch.add("/jobs/release/steps/2", {
      name: "Setup Node.js",
      uses: "actions/setup-node@v6",
      with: { "node-version": "24" },
    }),
  );

  // publib's NPM_TRUSTED_PUBLISHER skips its own token check but doesn't write
  // npm auth — fetch the GitHub OIDC token and write it to .npmrc before publib runs.
  releaseWorkflow.patch(
    JsonPatch.replace(
      "/jobs/release_npm/steps/10/run",
      [
        `TOKEN=$(curl -H "Authorization: bearer $ACTIONS_ID_TOKEN_REQUEST_TOKEN" "\${ACTIONS_ID_TOKEN_REQUEST_URL}&audience=https://registry.npmjs.org" | jq -r '.value')`,
        `echo "::add-mask::$TOKEN"`,
        `echo "//registry.npmjs.org/:_authToken=$TOKEN" >> ~/.npmrc`,
        `npx -p publib@latest publib-npm`,
      ].join("\n"),
    ),
  );
}

project.package.addField("volta", {
  node: "24.13.0",
});

project.package.addField("exports", {
  ".": {
    types: "./lib/index.d.ts",
    import: "./lib/index.js",
  },
  "./runtime": {
    types: "./lib/runtime.d.ts",
    import: "./lib/runtime.js",
  },
});

project.synth();
