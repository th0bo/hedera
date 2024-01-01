import type { SimpleGit } from "simple-git";

import * as vscode from "vscode";

export const register = (git: SimpleGit) =>
  vscode.commands.registerCommand("hedera.showFullCorrection", async () => {
    const diffResult = await git.diff(["test0..test1"]);
    const diffDocument = await vscode.workspace.openTextDocument({
      content: diffResult,
      language: "diff",
    });
    vscode.window.showTextDocument(diffDocument);
  });
