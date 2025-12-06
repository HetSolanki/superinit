import path from "node:path";
import fs from "fs-extra";
import { run } from "../../utils/run.js";
import type { FrontendAnswers } from "../types.js";
import supersetupDefaultPage from "../../utils/defaultPages/nextJs.js";

export async function generateNextApp(answers: FrontendAnswers) {
  const projectDir = path.resolve(process.cwd(), answers.projectName);

  const args = [answers.projectName, answers.withLint ? "--eslint" : ""];

  if (answers.useTypescript) {
    args.push("--ts");
  }

  await run("npx", ["create-next-app@latest", ...args]);

  await ensureEsm(projectDir);
  await ensureReadme(projectDir);
  await run("npm", ["install", "lucide-react"], projectDir);
  await updateHomePage(projectDir, answers.useTypescript);
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
  npm run dev
`.trimStart();

  await fs.writeFile(readmePath, content);
}

async function updateHomePage(projectDir: string, useTypescript: boolean) {
  // src directory exits or not
  const srcExits = await fs.pathExists(path.join(projectDir, "src"));

  // App router or not
  const appRouterExits = await fs.pathExists(
    path.join(projectDir, srcExits ? "src" : "", "app")
  );

  const pagePath = path.join(
    projectDir,
    srcExits ? "src" : "",
    appRouterExits ? "app" : "pages",
    appRouterExits
      ? useTypescript
        ? "page.tsx"
        : "page.jsx"
      : useTypescript
      ? "index.tsx"
      : "index.jsx"
  );

  await fs.writeFile(pagePath, supersetupDefaultPage);
}
