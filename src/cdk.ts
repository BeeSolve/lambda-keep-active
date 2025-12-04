import { Duration, Tags } from "aws-cdk-lib";
import { Rule, RuleTargetInput, Schedule } from "aws-cdk-lib/aws-events";
import { LambdaFunction } from "aws-cdk-lib/aws-events-targets";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import type { IFunction } from "aws-cdk-lib/aws-lambda";
import { Architecture } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { HandlerFunction } from "./handler-function";

export interface LambdaKeepActiveProps {
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

    const handler = new HandlerFunction(this, "LambdaKeepActive", {
      description: "LambdaKeepActive handler",
      memorySize: 128,
      timeout: Duration.minutes(5),
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

  public keepActive(lambda: IFunction) {
    Tags.of(lambda).add("keepActive", "true");
  }
}
