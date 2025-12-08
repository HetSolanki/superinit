// src/generators/backend/expressApi.ts
import path from "node:path";
import fs from "fs-extra";
import { run } from "../../utils/run.js";
import type { BackendAnswers } from "../types.js";

export async function generateExpressApi(answers: BackendAnswers) {
  const projectDir = path.resolve(process.cwd(), answers.projectName);
  const srcDir = path.join(projectDir, "src");

  await fs.mkdirp(srcDir);
  await fs.mkdirp(path.join(srcDir, "middlewares"));

  const pkg = {
    name: path.basename(projectDir),
    private: true,
    type: "module",
    scripts: {
      dev: "node src/index.js",
      start: "node src/index.js",
    },
  };

  await fs.writeJSON(path.join(projectDir, "package.json"), pkg, { spaces: 2 });

  const appJs = `
import express from "express";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    name: "supersetup",
    message: "One command. Every framework. Zero config hassle.",
    status: "ready"
  });
});

app.use(errorHandler);

export default app;
  `.trimStart();

  const indexJs = `
import app from "./app.js";
import config from "./config.js";

app.listen(config.port, () => {
  console.log("Server listening on http://localhost:" + config.port);
});
`.trimStart();

  const configJs = `
import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 4000,
};

export default config;
`.trimStart();

  const errorMiddlewareJs = `
export function errorHandler(err, _req, res, _next) {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
}
`.trimStart();

  const envExample = `
PORT=PORT_NUMBER_HERE
  `.trimStart();

  const gitignore = `
node_modules
.env
  `.trimStart();

  await fs.writeFile(path.join(srcDir, "index.js"), indexJs);
  await fs.writeFile(path.join(srcDir, "app.js"), appJs);
  await fs.writeFile(path.join(srcDir, "config.js"), configJs);
  await fs.writeFile(
    path.join(srcDir, "middlewares", "error.middleware.js"),
    errorMiddlewareJs
  );
  await fs.writeFile(path.join(projectDir, ".env"), envExample);
  await fs.writeFile(path.join(projectDir, ".gitignore"), gitignore);

  const readme = `
Backend: Express (Node.js)

Quickstart:

  cd ${path.basename(projectDir)}
  npm run dev
`.trimStart();

  await fs.writeFile(path.join(projectDir, "README.md"), readme);

  await run("npm", ["install", "express", "dotenv"], projectDir);
}
