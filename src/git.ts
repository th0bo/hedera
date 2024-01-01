import { simpleGit, SimpleGitOptions } from "simple-git";

export const initGit = (baseDir: string) => {
  const options: Partial<SimpleGitOptions> = {
    baseDir,
    binary: "git",
    maxConcurrentProcesses: 6,
    trimmed: false,
  };
  const git = simpleGit(options);
  return git;
};
