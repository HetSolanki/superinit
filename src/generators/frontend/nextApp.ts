import path from "node:path";
import fs from "fs-extra";
import { run } from "../../utils/run.js";
import type { FrontendAnswers } from "../types.js";

export async function generateNextApp(answers: FrontendAnswers) {
  const projectDir = path.resolve(process.cwd(), answers.projectName);

  const args = [answers.projectName, "--eslint", "--no-install"];

  if (answers.useTypescript) {
    args.push("--ts");
  }

  await run("npx", ["create-next-app@latest", ...args]);

  await ensureEsm(projectDir);
  await ensureReadme(projectDir);
}

async function ensureEsm(projectDir: string) {
  const pkgPath = path.join(projectDir, "package.json");
  const pkg = await fs.readJSON(pkgPath);

  if (!pkg.type) {
    pkg.type = "module";
    await fs.writeJSON(pkgPath, pkg, { spaces: 2 });
  }
}

async function ensureReadme(projectDir: string) {
  const readmePath = path.join(projectDir, "README.supersetup.md");
  const content = `
This project was bootstrapped with:

  npx create-next-app@latest

Quickstart:

  cd ${path.basename(projectDir)}
  npm install
  npm run dev
`.trimStart();

  await fs.writeFile(readmePath, content);
}
