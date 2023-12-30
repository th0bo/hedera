// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { simpleGit, SimpleGitOptions } from "simple-git";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "hedera" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const outputChannel = vscode.window.createOutputChannel("Hedera");
  const baseDir = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath as string;
  const options: Partial<SimpleGitOptions> = {
    baseDir,
    binary: "git",
    maxConcurrentProcesses: 6,
    trimmed: false,
  };
  const git = simpleGit(options);
  const disposables = [
    vscode.commands.registerCommand("hedera.test", async () => {}),
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
    }),
    vscode.commands.registerCommand("hedera.showCorrection", async () => {
      const diffResult = await git.diff(["test0..test1"]);
      const diffDocument = await vscode.workspace.openTextDocument({
        content: diffResult,
        language: "diff",
      });
      vscode.window.showTextDocument(diffDocument);
    }),
  ];

  context.subscriptions.push(...disposables);
}

// This method is called when your extension is deactivated
export function deactivate() {}
