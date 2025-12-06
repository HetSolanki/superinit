import path from "node:path";
import fs from "fs-extra";
import { run } from "../../utils/run.js";
import type { FrontendAnswers, FrontendTemplate } from "../types.js";
import supersetupDefaultPage from "../../utils/defaultPages/viteReact.js";

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

  // Configure Tailwind CSS
  await run(
    "npm",
    ["install", "tailwindcss", "@tailwindcss/vite"],
    projectName
  );
  await configViteForTailwind(projectDir, useTypescript);

  await updateHomePage(projectDir, useTypescript);
  await run("npm", ["install", "lucide-react"], projectDir);
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

async function updateHomePage(projectDir: string, useTypescript: boolean) {
  const pagePath = path.join(
    projectDir,
    "src",
    useTypescript ? "App.tsx" : "App.jsx"
  );

  await fs.writeFile(pagePath, supersetupDefaultPage);
}

async function configViteForTailwind(projectDir: string, ts: boolean) {
  const viteConfigPath = path.join(
    projectDir,
    ts ? "vite.config.ts" : "vite.config.js"
  );

  let viteConfig = `
  import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(), react()
  ],
})`;
  await fs.writeFile(viteConfigPath, viteConfig);

  const indexCssPath = path.join(projectDir, "src", "index.css");
  const indexCss = `@import "tailwindcss";`;
  await fs.writeFile(indexCssPath, indexCss);
}
