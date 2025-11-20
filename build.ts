import * as Bun from "bun";
import dts from "bun-plugin-dts";
import { rmSync } from "node:fs";

console.time("Built.");

rmSync("dist", { force: true, recursive: true });

await Bun.build({
  entrypoints: ["handler.ts"],
  outdir: "dist",
  target: "node",
  minify: true,
  splitting: true,
  sourcemap: "inline",
});
await Bun.build({
  entrypoints: ["cdk.ts", "runtime.ts"],
  outdir: "dist",
  target: "node",
  minify: true,
  splitting: true,
  sourcemap: "inline",
  external: ["aws-sdk", "aws-cdk", "aws-cdk-lib", "constructs"],
  plugins: [dts()],
});

console.timeEnd("Built.");
