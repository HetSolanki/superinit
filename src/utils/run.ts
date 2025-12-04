import { execa } from "execa";

export async function run(command: string, args: string[], cwd?: string) {
  await execa(command, args, { stdio: "inherit", cwd });
}
