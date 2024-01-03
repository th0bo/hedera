import type { Git } from "../git";

import * as vscode from "vscode";

export const register = (git: Git) =>
  vscode.commands.registerCommand("hedera.showFullCorrection", async () => {
    const diffResult = git.diff("test0", "test1");
    const diffDocument = await vscode.workspace.openTextDocument({
      content: diffResult,
      language: "diff",
    });
    vscode.window.showTextDocument(diffDocument);
  });
