import { execa } from "execa"
import kleur from "kleur"

const { bold, red, yellow, cyan, dim } = kleur

async function hasCommand(command: string, args: string[] = ["--version"]) {
  try {
    await execa(command, args, { stdio: "ignore" })
    return true
  } catch {
    return false
  }
}

export async function ensurePythonInstalled() {
  const ok = await hasCommand("python", ["--version"])
  if (ok) return

  console.log()
  console.log(bold(red("✖ Python not detected on your system.")))
  console.log()
  console.log(bold("To use the Python backend (FastAPI), please:"))
  console.log(`  1. Install Python from: ${cyan("https://www.python.org/downloads/")}`)
  console.log(`  2. On Windows, make sure to check ${yellow('"Add Python to PATH"')}.`)
  console.log("  3. After installation, verify with:")
  console.log(`       ${yellow("python --version")}`)
  console.log("  4. Then re-run:")
  console.log(`       ${yellow("superinit")}`)
  console.log()
  console.log(dim("Aborting for now because required tooling is missing."))
  process.exit(1)
}

export async function ensureGoInstalled() {
  const ok = await hasCommand("go", ["version"])
  if (ok) return

  console.log()
  console.log(bold(red("✖ Go not detected on your system.")))
  console.log()
  console.log(bold("To use the Go backend (Gin), please:"))
  console.log(`  1. Install Go from: ${cyan("https://go.dev/doc/install")}`)
  console.log("  2. Follow the OS-specific instructions on that page.")
  console.log("  3. After installation, verify with:")
  console.log(`       ${yellow("go version")}`)
  console.log("  4. Then re-run:")
  console.log(`       ${yellow("superinit")}`)
  console.log()
  console.log(dim("Aborting for now because required tooling is missing."))
  process.exit(1)
}
