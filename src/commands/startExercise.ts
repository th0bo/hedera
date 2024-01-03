import type { Git } from "../git";

import * as vscode from "vscode";

export const register = (git: Git) =>
  vscode.commands.registerCommand("hedera.startExercise", async () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    const exercises: vscode.QuickPickItem[] = git
      .tag()
      .map((tag) => ({ label: tag }));
    const pickedExercise = await vscode.window.showQuickPick(exercises, {
      placeHolder: "Select an exercise",
      ignoreFocusOut: true,
    });
    const statusResult = git.status();
    if (!statusResult.clean) {
      if (statusResult.detachedHead !== undefined) {
        const currentExercise = statusResult.detachedHead;
        git.switch(`hedera-${currentExercise}`, true);
      }
      git.add();
      git.commit("Hedera");
    }
    git.checkout(pickedExercise?.label as string);
    vscode.window.showInformationMessage(
      `Starting exercise ${pickedExercise?.label as string}.`
    );
  });
