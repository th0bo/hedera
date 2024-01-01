import * as vscode from "vscode";

export const selectBaseDir = async () => {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders === undefined || workspaceFolders.length === 0) {
    throw new Error("No workspace folder.");
  }
  const baseDir = (
    workspaceFolders.length > 1
      ? ((await vscode.window.showWorkspaceFolderPick()) as vscode.WorkspaceFolder)
      : workspaceFolders[0]
  ).uri.fsPath;

  return baseDir;
};
