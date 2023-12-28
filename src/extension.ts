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
  let disposable = vscode.commands.registerCommand(
    "hedera.helloWorld",
    async () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      const baseDir = vscode.workspace.workspaceFolders?.[0]?.uri
        .fsPath as string;
      const options: Partial<SimpleGitOptions> = {
        baseDir,
        binary: "git",
        maxConcurrentProcesses: 6,
        trimmed: false,
      };
      const git = simpleGit(options);
      const diffResult = await git.diff();
      outputChannel.appendLine(diffResult);
      outputChannel.show();
      const commitsHashes: vscode.QuickPickItem[] = (
        await git.tags()
      ).all.map((tag) => ({ label: tag }));
      const pickedHash = await vscode.window.showQuickPick(commitsHashes, {
        placeHolder: "Select an option",
        ignoreFocusOut: true,
      });
      await git.checkout(pickedHash?.label as string, (err, data) => {});
      vscode.window.showInformationMessage("Hello World from Hedera!");
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
