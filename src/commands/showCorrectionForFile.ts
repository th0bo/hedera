import type { SimpleGit } from "simple-git";

import * as vscode from "vscode";

export const register = (git: SimpleGit) =>
  vscode.commands.registerCommand("hedera.showCorrectionForFile", async () => {
    const diffResult = await git.diff([
      "test0..test1",
      "--",
      "style/content/inbox.css",
    ]);

    const diffDocument = await vscode.workspace.openTextDocument({
      content: diffResult,
      language: "diff",
    });
    vscode.window.showTextDocument(diffDocument);
  });
