import path from "node:path";
import fs from "fs-extra";
import { run } from "../../utils/run.js";
import type { FrontendAnswers, FrontendTemplate } from "../types.js";

export async function generateViteApp(answers: FrontendAnswers) {
  const { projectName, frontend, useTypescript } = answers;

  const template = resolveTemplate(frontend, useTypescript);
  if (!template) return;

  await run("npm", [
    "create",
    "vite@latest",
    projectName,
    "--",
    "--template",
    template,
  ]);

  const projectDir = path.resolve(process.cwd(), projectName);
  await ensureEsm(projectDir);
  await ensureReadme(projectDir);
}

function resolveTemplate(frontend: FrontendTemplate, ts: boolean) {
  if (frontend === "vite-react") return ts ? "react-ts" : "react";
  if (frontend === "vite-vue") return ts ? "vue-ts" : "vue";
  if (frontend === "vite-svelte") return ts ? "svelte-ts" : "svelte";
  if (frontend === "vite-vanilla") return ts ? "vanilla-ts" : "vanilla";
  return null;
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

  npm create vite@latest

Quickstart:

  cd ${path.basename(projectDir)}
  npm install
  npm run dev
`.trimStart();

  await fs.writeFile(readmePath, content);
}
