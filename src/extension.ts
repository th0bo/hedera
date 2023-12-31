// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import { selectBaseDir } from './baseDir';
import { Git } from './git';
import { register as registerTest } from './commands/test';
import { register as registerStartExercise } from './commands/startExercise';
import { register as registerShowFullCorrection } from './commands/showFullCorrection';
import { register as registerShowCorrectionForFile } from './commands/showCorrectionForFile';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "hedera" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const outputChannel = vscode.window.createOutputChannel("Hedera");

  const baseDir = await selectBaseDir();
  const git = new Git(baseDir);

  const disposables = [
    registerTest(),
    registerStartExercise(git),
    registerShowFullCorrection(git),
    registerShowCorrectionForFile(git),
  ];
  context.subscriptions.push(...disposables);
}

// This method is called when your extension is deactivated
export function deactivate() {}
