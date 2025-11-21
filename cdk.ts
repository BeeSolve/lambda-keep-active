import { Duration, Tags } from "aws-cdk-lib";
import { Rule, RuleTargetInput, Schedule } from "aws-cdk-lib/aws-events";
import { LambdaFunction } from "aws-cdk-lib/aws-events-targets";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import type { IFunction } from "aws-cdk-lib/aws-lambda";
import { Architecture, Code, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface LambdaKeepActiveProps {
  /**
   * If disabled no logs are logged to CloudWatch
   *
   * @default true
   */
  readonly enableLogs?: boolean;
}

export class LambdaKeepActive extends Construct {
  constructor(scope: Construct, id: string, props?: LambdaKeepActiveProps) {
    super(scope, id);

    const handler = new NodejsFunction(this, "LambdaKeepActive", {
      description: "LambdaKeepActive handler",
      code: Code.fromAsset(`${__dirname}/handler.js`),
      handler: "handler",
      memorySize: 128,
      timeout: Duration.minutes(5),
      runtime: Runtime.NODEJS_22_X,
      architecture: Architecture.ARM_64,
      environment: {
        NODE_ENV: "production",
        ENABLE_LOGS: String(props?.enableLogs ?? true),
      },
    });

    new Rule(this, "KeepActive", {
      schedule: Schedule.rate(Duration.days(3)),
      targets: [
        new LambdaFunction(handler, {
          event: RuleTargetInput.fromObject({
            action: "lambdaKeepActive",
          }),
        }),
      ],
    });

    handler.addToRolePolicy(
      new PolicyStatement({
        actions: ["lambda:InvokeFunction", "tag:GetResources"],
        resources: ["*"],
        effect: Effect.ALLOW,
      }),
    );
  }

  readonly keepActive = (lambda: IFunction) => {
    Tags.of(lambda).add("keepActive", "true");
  };
}
