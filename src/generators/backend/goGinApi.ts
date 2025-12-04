import path from "node:path";
import fs from "fs-extra";
import { run } from "../../utils/run.js";
import type { BackendAnswers } from "../types.js";

export async function generateGoGinApi(answers: BackendAnswers) {
  const projectDir = path.resolve(process.cwd(), answers.projectName);
  await fs.mkdirp(projectDir);

  const mainGo = `
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"ok": true})
	})
	r.Run()
}
`.trimStart();

  await fs.writeFile(path.join(projectDir, "main.go"), mainGo);

  const moduleName = path.basename(projectDir);
  await run("go", ["mod", "init", moduleName], projectDir);
  await run("go", ["get", "github.com/gin-gonic/gin@latest"], projectDir);

  const readme = `
Backend: Gin (Go)

Quickstart:

  go run main.go
`.trimStart();

  await fs.writeFile(path.join(projectDir, "README.md"), readme);
}
