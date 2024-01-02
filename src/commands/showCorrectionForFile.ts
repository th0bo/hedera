import * as vscode from "vscode";
import { diff } from "../gitb";

export const register = (baseDir: string) =>
  vscode.commands.registerCommand("hedera.showCorrectionForFile", async () => {
    const diffResult = diff(baseDir, "test0", "test1", "style/content/inbox.css");

    const diffDocument = await vscode.workspace.openTextDocument({
      content: diffResult,
      language: "diff",
    });
    vscode.window.showTextDocument(diffDocument);
  });
