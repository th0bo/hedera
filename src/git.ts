import * as cp from "child_process";

export class Git {
  private readonly cdCmd: string;
  constructor(private readonly baseDir: string) {
    this.cdCmd = `cd ${this.baseDir} && `;
  }

  diff = (revisionA: string, revisionB: string, fileRelativePath?: string) => {
    const filesOption =
      fileRelativePath === undefined ? "" : ` -- ${fileRelativePath}`;
    const cmd = this.cdCmd + `git diff ${revisionA}..${revisionB}${filesOption}`;
    return cp.execSync(cmd).toString();
  };

  tag = () => {
    const cmd = this.cdCmd + `git tag`;
    return cp.execSync(cmd).toString().split("\n").filter(tag => tag !== "");
  };

  status = () => {
    const cmd = this.cdCmd + `git status`;
    const output = cp.execSync(cmd).toString();
    const detachedHeadMatcher = output.match(/HEAD detached at (\w+)/);
    return {
      clean: output.includes("nothing to commit, working tree clean"),
      detachedHead: detachedHeadMatcher?.[1],

    };
  };

  add = () => {
    const cmd = this.cdCmd + `git add -A`;
    return cp.execSync(cmd).toString();
  };

  commit = (message: string) => {
    const cmd = this.cdCmd + `git commit -m '${message}'`;
    return cp.execSync(cmd).toString();
  };

  checkout = (revision: string) => {
    const cmd = this.cdCmd + `git checkout ${revision}`;
    return cp.execSync(cmd).toString();
  };

  switch = (branch: string, create: boolean = false) => {
    const createOption = create ? " -c" :  "";
    const cmd = this.cdCmd + `git switch${createOption} ${branch}`;
    return cp.execSync(cmd).toString();
  };
}