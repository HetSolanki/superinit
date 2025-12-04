import path from "node:path";
import fs from "fs-extra";
import type { BackendAnswers } from "../types.js";

export async function generatePythonFastApi(answers: BackendAnswers) {
  const projectDir = path.resolve(process.cwd(), answers.projectName);
  const srcDir = path.join(projectDir, "app");

  await fs.mkdirp(srcDir);

  const mainPy = `
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"ok": True}
`.trimStart();

  const requirements = `
fastapi
uvicorn[standard]
`.trimStart();

  await fs.writeFile(path.join(srcDir, "main.py"), mainPy);
  await fs.writeFile(path.join(projectDir, "requirements.txt"), requirements);

  const readme = `
Backend: FastAPI

Quickstart:

  python -m venv .venv
  source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
  pip install -r requirements.txt
  uvicorn app.main:app --reload
`.trimStart();

  await fs.writeFile(path.join(projectDir, "README.md"), readme);
}
