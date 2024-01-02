import * as vscode from "vscode";
import { diff } from '../gitb';

export const register = (baseDir: string) =>
  vscode.commands.registerCommand("hedera.showFullCorrection", async () => {
    const diffResult = diff(baseDir, "test0", "test1");
    const diffDocument = await vscode.workspace.openTextDocument({
      content: diffResult,
      language: "diff",
    });
    vscode.window.showTextDocument(diffDocument);
  });
