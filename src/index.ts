import path from "node:path";
import prompts from "prompts";
import kleur from "kleur";
import { generateNextApp } from "./generators/frontend/nextApp.js";
import { generateViteApp } from "./generators/frontend/viteApp.js";
import { generateExpressApi } from "./generators/backend/expressApi.js";
import { generateFastifyApi } from "./generators/backend/fastifyApi.js";
import { generatePythonFastApi } from "./generators/backend/pythonFastApi.js";
import { generateGoGinApi } from "./generators/backend/goGinApi.js";
import { ensurePythonInstalled, ensureGoInstalled } from "./utils/checks.js";
import type {
  Answers,
  Mode,
  FrontendTemplate,
  BackendTemplate,
  Language,
  FrontendAnswers,
  BackendAnswers,
} from "./generators/types.js";

const { bold, green, cyan, dim, yellow } = kleur;

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  printHelp();
  process.exit(0);
}

function printHelp() {
  console.log();
  console.log(bold(cyan("superinit — App Scaffolding CLI")));
  console.log();
  console.log("Usage:");
  console.log(`  ${yellow("superinit")}        Start interactive setup`);
  console.log(`  ${yellow("superinit --help")} Show this help`);
  console.log();
  console.log(bold("What you can create:"));
  console.log(`  ${yellow("Frontend apps")}`);
  console.log("    - Next.js");
  console.log("    - Vite (React, Vue, Svelte, Vanilla)");
  console.log();
  console.log(`  ${yellow("Backend APIs")}`);
  console.log("    - Node.js  (Express, Fastify)");
  console.log("    - Python   (FastAPI)");
  console.log("    - Go       (Gin)");
  console.log();
  console.log(bold("Notes:"));
  console.log("  - Frontend and backend are created separately.");
  console.log("  - No server is auto-started.");
  console.log("  - No dependencies are auto-installed.");
  console.log("  - Missing tools (Go, Python) are detected and reported.");
  console.log();
}

async function main() {
  const base = await prompts([
    {
      type: "select",
      name: "mode",
      message: "What do you want to create?",
      choices: [
        { title: "Frontend app", value: "frontend" as Mode },
        { title: "Backend API", value: "backend" as Mode },
      ],
    },
    {
      type: "text",
      name: "projectName",
      message: "Project name:",
      validate: (value) => (value.trim().length > 0 ? true : "Required"),
    },
  ]);

  if (!base.mode || !base.projectName) process.exit(1);

  if (base.mode === "frontend") {
    const answers = await askFrontendQuestions(base.projectName);
    await handleFrontend(answers);
  } else {
    const answers = await askBackendQuestions(base.projectName);
    await handleBackend(answers);
  }
}

async function askFrontendQuestions(
  projectName: string
): Promise<FrontendAnswers> {
  const res = await prompts([
    {
      type: "select",
      name: "frontend",
      message: "Choose a frontend framework:",
      choices: [
        { title: "Next.js", value: "next" as FrontendTemplate },
        { title: "Vite + React", value: "vite-react" as FrontendTemplate },
        { title: "Vite + Vue", value: "vite-vue" as FrontendTemplate },
        { title: "Vite + Svelte", value: "vite-svelte" as FrontendTemplate },
        { title: "Vite + Vanilla", value: "vite-vanilla" as FrontendTemplate },
      ],
    },
    {
      type: "toggle",
      name: "useTypescript",
      message: "Use TypeScript?",
      initial: true,
      active: "yes",
      inactive: "no",
    },
    {
      type: "toggle",
      name: "withJest",
      message: "Add Jest support? (future use)",
      initial: false,
      active: "yes",
      inactive: "no",
    },
    {
      type: "toggle",
      name: "withLint",
      message: "Add extra linting config? (future use)",
      initial: true,
      active: "yes",
      inactive: "no",
    },
  ]);

  const answers: FrontendAnswers = {
    mode: "frontend",
    projectName,
    frontend: res.frontend,
    useTypescript: res.useTypescript,
    withJest: res.withJest,
    withLint: res.withLint,
  };

  return answers;
}

async function askBackendQuestions(
  projectName: string
): Promise<BackendAnswers> {
  const base = await prompts([
    {
      type: "select",
      name: "language",
      message: "Choose backend language:",
      choices: [
        { title: "Node.js", value: "node" as Language },
        { title: "Python", value: "python" as Language },
        { title: "Go", value: "go" as Language },
      ],
    },
  ]);

  const backendChoices =
    base.language === "node"
      ? [
          { title: "Express", value: "express" as BackendTemplate },
          { title: "Fastify", value: "fastify" as BackendTemplate },
        ]
      : base.language === "python"
      ? [{ title: "FastAPI", value: "fastapi" as BackendTemplate }]
      : [{ title: "Gin", value: "gin" as BackendTemplate }];

  const rest = await prompts([
    {
      type: "select",
      name: "backend",
      message: "Choose a backend framework:",
      choices: backendChoices,
    },
    {
      type: "toggle",
      name: "withJest",
      message: "Add testing setup? (future use)",
      initial: false,
      active: "yes",
      inactive: "no",
    },
    {
      type: "toggle",
      name: "withLint",
      message: "Add extra linting config? (future use)",
      initial: true,
      active: "yes",
      inactive: "no",
    },
  ]);

  const answers: BackendAnswers = {
    mode: "backend",
    projectName,
    language: base.language,
    backend: rest.backend,
    withJest: rest.withJest,
    withLint: rest.withLint,
  };

  return answers;
}

async function handleFrontend(answers: FrontendAnswers) {
  const rootDir = answers.projectName;
  const projectDir = path.join(rootDir); // or `${rootDir}/frontend` if you want that style

  if (answers.frontend === "next") {
    await generateNextApp({ ...answers, projectName: projectDir });
  } else {
    await generateViteApp({ ...answers, projectName: projectDir });
  }

  printFrontendSummary(projectDir);
}

async function handleBackend(answers: BackendAnswers) {
  const rootDir = answers.projectName;
  const projectDir = path.join(rootDir); // or `${rootDir}/backend` if you want that style

  if (answers.language === "node") {
    if (answers.backend === "express") {
      await generateExpressApi({ ...answers, projectName: projectDir });
    } else if (answers.backend === "fastify") {
      await generateFastifyApi({ ...answers, projectName: projectDir });
    }
  } else if (answers.language === "python") {
    await ensurePythonInstalled();
    await generatePythonFastApi({ ...answers, projectName: projectDir });
  } else if (answers.language === "go") {
    await ensureGoInstalled();
    await generateGoGinApi({ ...answers, projectName: projectDir });
  }

  printBackendSummary(answers, projectDir);
}

function printFrontendSummary(projectDir: string) {
  console.log();
  console.log(bold(green("✔ Frontend app created")));
  console.log();
  console.log(`${bold("Location")} ${cyan(projectDir)}`);
  console.log();
  console.log(bold("Next steps:"));
  console.log(`  ${yellow(`cd ${projectDir}`)}`);
  console.log(`  ${yellow("npm install")}`);
  console.log(`  ${yellow("npm run dev")}`);
  console.log();
  console.log(
    dim("Open this folder in your editor and start building your UI.")
  );
}

function printBackendSummary(answers: BackendAnswers, projectDir: string) {
  console.log();
  console.log(bold(green("✔ Backend API created")));
  console.log();
  console.log(`${bold("Location")} ${cyan(projectDir)}`);
  console.log();

  if (answers.language === "node") {
    console.log(bold("Next steps (Node.js):"));
    console.log(`  ${yellow(`cd ${projectDir}`)}`);
    console.log(`  ${yellow("npm install")}`);
    console.log(`  ${yellow("npm run dev")}`);
  } else if (answers.language === "python") {
    console.log(bold("Next steps (Python + FastAPI):"));
    console.log(`  ${yellow(`cd ${projectDir}`)}`);
    console.log(`  ${yellow("python -m venv .venv")}`);
    console.log(
      `  ${yellow("source .venv/bin/activate")}  ${dim(
        "# Windows: .venv\\Scripts\\activate"
      )}`
    );
    console.log(`  ${yellow("pip install -r requirements.txt")}`);
    console.log(`  ${yellow("uvicorn app.main:app --reload")}`);
  } else if (answers.language === "go") {
    console.log(bold("Next steps (Go + Gin):"));
    console.log(`  ${yellow(`cd ${projectDir}`)}`);
    console.log(`  ${yellow("go run main.go")}`);
  }

  console.log();
  console.log(
    dim("Open this folder in your editor and start implementing your API.")
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
