import type { SimpleGit } from "simple-git";

import * as vscode from "vscode";

export const register = (git: SimpleGit) =>
  vscode.commands.registerCommand("hedera.startExercise", async () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    const exercises: vscode.QuickPickItem[] = (await git.tags()).all.map(
      (tag) => ({ label: tag })
    );
    const pickedExercise = await vscode.window.showQuickPick(exercises, {
      placeHolder: "Select an exercise",
      ignoreFocusOut: true,
    });
    const statusResult = await git.status();
    if (!statusResult.isClean()) {
      if (statusResult.detached) {
        const currentExercise = (await git.log()).all
          .map(({ refs }) => /tag: (\w+)/.exec(refs))
          .filter((execArray) => execArray !== undefined)[0]?.[1];
        await git.checkoutLocalBranch(`hedera-${currentExercise}`);
      }
      await git.add(statusResult.modified);
      await git.commit("Hedera");
    }
    await git.checkout(pickedExercise?.label as string, (err, data) => {});
    vscode.window.showInformationMessage(
      `Starting exercise ${pickedExercise}.`
    );
  });
