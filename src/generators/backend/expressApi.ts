// src/generators/backend/expressApi.ts
import path from "node:path";
import fs from "fs-extra";
import { run } from "../../utils/run.js";
import type { BackendAnswers } from "../types.js";

export async function generateExpressApi(answers: BackendAnswers) {
  const projectDir = path.resolve(process.cwd(), answers.projectName);
  const srcDir = path.join(projectDir, "src");

  await fs.mkdirp(srcDir);

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

  const indexJs = `
import express from "express"

const app = express()
const port = Number(process.env.PORT ?? 3000)

app.get("/", (_req, res) => {
  res.json({ ok: true })
})

app.listen(port, () => {
  console.log("Server listening on http://localhost:" + port)
})
`.trimStart();

  await fs.writeFile(path.join(srcDir, "index.js"), indexJs);

  const readme = `
Backend: Express (Node.js)

Quickstart:

  cd ${path.basename(projectDir)}
  npm install
  npm run dev
`.trimStart();

  await fs.writeFile(path.join(projectDir, "README.md"), readme);

  await run("npm", ["install", "express"], projectDir);
}
