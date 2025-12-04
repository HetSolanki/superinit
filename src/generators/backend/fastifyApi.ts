import path from "node:path";
import fs from "fs-extra";
import { run } from "../../utils/run.js";
import type { Answers } from "../types.js";

export async function generateFastifyApi(answers: Answers) {
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
import Fastify from "fastify"

const app = Fastify({ logger: true })
const port = Number(process.env.PORT ?? 3000)

app.get("/", async () => {
  return { ok: true }
})

app.listen({ port }, err => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  console.log("Server running on http://localhost:" + port)
})
`.trimStart();

  await fs.writeFile(path.join(srcDir, "index.js"), indexJs);

  await run("npm", ["install", "fastify"], projectDir);
}
