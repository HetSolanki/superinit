export type Mode = "frontend" | "backend";

export type Language = "node" | "python" | "go";

export type FrontendTemplate =
  | "none"
  | "next"
  | "vite-react"
  | "vite-vue"
  | "vite-svelte"
  | "vite-vanilla";

export type BackendTemplateNode = "express" | "fastify";

export type BackendTemplatePython = "fastapi";

export type BackendTemplateGo = "gin";

export type BackendTemplate =
  | BackendTemplateNode
  | BackendTemplatePython
  | BackendTemplateGo;

export interface FrontendAnswers {
  mode: "frontend";
  projectName: string;
  frontend: FrontendTemplate;
  useTypescript: boolean;
  withJest: boolean;
  withLint: boolean;
}

export interface BackendAnswers {
  mode: "backend";
  projectName: string;
  language: Language;
  backend: BackendTemplate;
  withJest: boolean;
  withLint: boolean;
}

export type Answers = FrontendAnswers | BackendAnswers;
