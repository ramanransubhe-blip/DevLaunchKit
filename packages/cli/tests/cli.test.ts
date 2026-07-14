import { test } from "node:test";
import * as assert from "node:assert";
import * as fs from "node:fs";
import * as path from "node:path";
import { handleCreateCommand } from "../src/commands/create.js";
import { handleAddCommand } from "../src/commands/add.js";
import { handleDoctorCommand } from "../src/commands/doctor.js";

test("CLI Create command simulation", () => {
  const targetPath = path.resolve(process.cwd(), "saas-demo");
  fs.rmSync(targetPath, { recursive: true, force: true });

  let logOutput = "";
  const originalLog = console.log;
  console.log = (msg: string) => { logOutput += msg + "\n"; };

  const originalExit = process.exit;
  let exitCode: number | undefined = undefined;
  // @ts-ignore
  process.exit = (code?: number) => { exitCode = code; throw new Error("exit"); };

  try {
    handleCreateCommand("saas-demo");
    assert.ok(logOutput.includes("Initializing new SaaS application"));
    assert.ok(logOutput.includes("saas-demo"));
  } catch (err: any) {
    if (err.message !== "exit") throw err;
  } finally {
    console.log = originalLog;
    process.exit = originalExit;
    fs.rmSync(targetPath, { recursive: true, force: true });
  }
});

test("CLI Add command simulation", () => {
  let logOutput = "";
  const originalLog = console.log;
  console.log = (msg: string) => { logOutput += msg + "\n"; };

  const originalExit = process.exit;
  let exitCode: number | undefined = undefined;
  // @ts-ignore
  process.exit = (code?: number) => { exitCode = code; throw new Error("exit"); };

  try {
    handleAddCommand("stripe");
    assert.ok(logOutput.includes("Configuring provider module"));
    assert.ok(logOutput.includes("stripe"));
  } catch (err: any) {
    if (err.message !== "exit") throw err;
  } finally {
    console.log = originalLog;
    process.exit = originalExit;
  }
});

test("CLI Doctor command simulation", async () => {
  let logOutput = "";
  const originalLog = console.log;
  console.log = (msg: string) => { logOutput += msg + "\n"; };

  const originalExit = process.exit;
  let exitCode: number | undefined = undefined;
  // @ts-ignore
  process.exit = (code?: number) => { exitCode = code; throw new Error("exit"); };

  try {
    await handleDoctorCommand();
    assert.ok(logOutput.includes("Assessing DevLaunchKit system health"));
    assert.ok(logOutput.includes("Node.js runtime: OK"));
  } catch (err: any) {
    if (err.message !== "exit") throw err;
  } finally {
    console.log = originalLog;
    process.exit = originalExit;
  }
});
