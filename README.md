# Lambda Keep Active

> A function becomes inactive when it has been idle long enough for Lambda to reclaim the external resources that were configured for it. When you try to invoke a function that is inactive, the invocation fails and Lambda sets the function to pending state until the function resources are recreated. If Lambda fails to recreate the resources, the function returns to the inactive state. You might need to resolve any errors and redeploy your function to restore it to the active state.
> 
> [Lambda function states](https://docs.aws.amazon.com/lambda/latest/dg/functions-states.html)

Whenever your Lambda function becames `inactive` waking it up might take up to 90 seconds as per [this article](https://aws.amazon.com/blogs/compute/announcing-improved-vpc-networking-for-aws-lambda-functions/).

In order to avoid your Lambda functions to transition to `inactive` state you should invoke them periodically.

No-one really knows what the "long enough" actually means but there is [general consenzus](https://stackoverflow.com/questions/77584016/how-long-before-idle-lambda-function-transitions-to-inactive-state/77691745#77691745) that it might be around 14 days.

At BeeSolve we are invoking our Lambda functions every 3 days in order to be sure they won't transition to `inactive` state.

## Installation

You can install Lambda Keep Active helper through npm or any other npm compatible package manager:

```bash
npm i @beesolve/lambda-keep-active
```

## Usage

```ts
// stack.ts
import { LambdaKeepActive } from "@beesolve/lambda-keep-active";

const warmer = new LambdaKeepActive(this, "KeepAliveLambda");

const handler = new NodejsFunction(this, 'Handler', { /** your props */});

warmer.keepActive(handler);
```

For Node.js Lambda handlers you can use `keptActive` wrapper like this:

```ts
// handler.ts
import { keptActive } from "@beesolve/lambda-keep-active";

export const handler = keptActive(async () => {
  // your handler code
});
```

For [Bun Lambda handlers](https://github.com/BeeSolve/lambda-bun-runtime) you can use `keptActiveFetch` wrapper like this:

```ts
// bunHandler.ts
import { keptActiveFetch } from "@beesolve/lambda-keep-active";

export default {
  fetch: keptActiveFetch(async (request: Request): Promise<Response> => {
    // your handler code
    return new Response();
  }),
};
```
