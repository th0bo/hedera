import * as cp from "child_process";

export class Git {
  constructor(private readonly baseDir: string) {}

  diff = (revisionA: string, revisionB: string, fileRelativePath?: string) => {
    const filesOption =
      fileRelativePath === undefined ? "" : ` -- ${fileRelativePath}`;
    const cmd = `git diff ${revisionA}..${revisionB}${filesOption}`;
    return cp.execSync(cmd, { cwd: this.baseDir }).toString();
  };

  tag = () => {
    const cmd = `git tag`;
    return cp.execSync(cmd, { cwd: this.baseDir }).toString().split("\n").filter(tag => tag !== "");
  };

  status = () => {
    const cmd = `git status`;
    const output = cp.execSync(cmd, { cwd: this.baseDir }).toString();
    const detachedHeadMatcher = output.match(/HEAD detached at (\w+)/);
    return {
      clean: output.includes("nothing to commit, working tree clean"),
      detachedHead: detachedHeadMatcher?.[1],

    };
  };

  add = () => {
    const cmd = `git add -A`;
    return cp.execSync(cmd, { cwd: this.baseDir }).toString();
  };

  commit = (message: string) => {
    const cmd = `git commit -m '${message}'`;
    return cp.execSync(cmd, { cwd: this.baseDir }).toString();
  };

  checkout = (revision: string) => {
    const cmd = `git checkout ${revision}`;
    return cp.execSync(cmd, { cwd: this.baseDir }).toString();
  };

  switch = (branch: string, create: boolean = false) => {
    const createOption = create ? " -c" :  "";
    const cmd = `git switch${createOption} ${branch}`;
    return cp.execSync(cmd, { cwd: this.baseDir }).toString();
  };
}