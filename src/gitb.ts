import * as cp from "child_process";

export const diff = (
  baseDir: string,
  revision0: string,
  revision1: string,
  fileRelativePath?: string
) => {
  const filesOption =
    fileRelativePath === undefined ? "" : ` -- ${fileRelativePath}`;
  const cmd = `cd ${baseDir} && git diff ${revision0}..${revision1}${filesOption}`;
  return cp.execSync(cmd).toString();
};