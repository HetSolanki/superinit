import path from "node:path";
import fs from "fs-extra";
import { run } from "../../utils/run.js";
import type { FrontendAnswers, FrontendTemplate } from "../types.js";
import viteReactDefaultPage from "../../utils/defaultPages/viteReact.js";
import viteSvelteDefaultPage from "../../utils/defaultPages/viteSvelte.js";
import viteVueDefaultPage from "../../utils/defaultPages/viteVue.js";
import viteVanillaDefaultPage from "../../utils/defaultPages/viteVanilla.js";

interface TemplateConfig {
  viteTemplate: string;
  defaultPage: string;
  dependencies: string[];
  appFile: string;
  viteConfigImport: string;
  vitePlugin: string;
  cssFile: string;
}

export async function generateViteApp(answers: FrontendAnswers) {
  const { projectName, frontend, useTypescript } = answers;
  const config = getTemplateConfig(frontend, useTypescript);

  if (!config) return;

  // Create Vite project
  await run("npm", [
    "create",
    "vite@latest",
    projectName,
    "--",
    "--template",
    config.viteTemplate,
  ]);

  const projectDir = path.resolve(process.cwd(), projectName);

  // Install Tailwind CSS
  await run(
    "npm",
    ["install", "tailwindcss", "@tailwindcss/vite"],
    projectName
  );

  // Install framework-specific dependencies
  if (config.dependencies.length > 0) {
    await run("npm", ["install", ...config.dependencies], projectDir);
  }

  // Configure Vite for Tailwind
  await configViteForTailwind(
    projectDir,
    useTypescript,
    config.viteConfigImport,
    config.vitePlugin
  );

  // Update CSS file
  await updateCssFile(projectDir, config.cssFile);

  // Update home page
  await updateHomePage(projectDir, config.appFile, config.defaultPage);

  // Ensure ESM and README
  await ensureEsm(projectDir);
  await ensureReadme(projectDir);
}

function getTemplateConfig(
  frontend: FrontendTemplate,
  useTypescript: boolean
): TemplateConfig | null {
  const ext = useTypescript ? "ts" : "js";
  const jsxExt = useTypescript ? "tsx" : "jsx";

  switch (frontend) {
    case "vite-react":
      return {
        viteTemplate: useTypescript ? "react-ts" : "react",
        defaultPage: viteReactDefaultPage,
        dependencies: ["lucide-react"],
        appFile: `src/App.${jsxExt}`,
        viteConfigImport: "import react from '@vitejs/plugin-react'",
        vitePlugin: "react()",
        cssFile: "src/index.css",
      };

    case "vite-vue":
      return {
        viteTemplate: useTypescript ? "vue-ts" : "vue",
        defaultPage: viteVueDefaultPage,
        dependencies: ["lucide-vue-next"],
        appFile: `src/App.vue`,
        viteConfigImport: "import vue from '@vitejs/plugin-vue'",
        vitePlugin: "vue()",
        cssFile: "src/style.css",
      };

    case "vite-svelte":
      return {
        viteTemplate: useTypescript ? "svelte-ts" : "svelte",
        defaultPage: viteSvelteDefaultPage,
        dependencies: ["lucide-svelte"],
        appFile: `src/App.svelte`,
        viteConfigImport:
          "import { svelte } from '@sveltejs/vite-plugin-svelte'",
        vitePlugin: "svelte()",
        cssFile: "src/app.css",
      };

    case "vite-vanilla":
      return {
        viteTemplate: useTypescript ? "vanilla-ts" : "vanilla",
        defaultPage: viteVanillaDefaultPage,
        dependencies: [],
        appFile: "index.html",
        viteConfigImport: "",
        vitePlugin: "",
        cssFile: "src/style.css",
      };

    default:
      return null;
  }
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

async function updateHomePage(
  projectDir: string,
  appFile: string,
  defaultPage: string
) {
  const pagePath = path.join(projectDir, appFile);
  await fs.writeFile(pagePath, defaultPage);
}

async function updateCssFile(projectDir: string, cssFile: string) {
  const cssPath = path.join(projectDir, cssFile);
  const cssContent = `@import "tailwindcss";`;
  await fs.writeFile(cssPath, cssContent);
}

async function configViteForTailwind(
  projectDir: string,
  useTypescript: boolean,
  viteConfigImport: string,
  vitePlugin: string
) {
  const ext = useTypescript ? "ts" : "js";
  const viteConfigPath = path.join(projectDir, `vite.config.${ext}`);

  const plugins = ["tailwindcss()"];
  if (vitePlugin) {
    plugins.push(vitePlugin);
  }

  const viteConfig = `import { defineConfig } from 'vite'
${viteConfigImport}
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [${plugins.join(", ")}],
})
`;

  await fs.writeFile(viteConfigPath, viteConfig);
}
