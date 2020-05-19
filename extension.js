// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const constructor = vscode.commands.registerCommand('getter-setter-constructor-php.constructor', function () {
		const editor = vscode.window.activeTextEditor;
		const vars = editor.document.getText(editor.selection).replace(/[^a-zA-Z,]/g, "").split(',')
		let constructor = '\t__constructor('
		constructor += editor.document.getText(editor.selection).replace(/[^a-zA-Z,$]/g, "") + ') { \n'
		vars.forEach(element => {
			constructor += `\t\t$this->${element} = $${element}; \n`
		})
		constructor += '\t}'
		editor.edit(edit => {
			edit.insert(new vscode.Position(editor.document.lineCount - 1, 0), '\n' + constructor + '\n')
		})
	})

	const setter = () => {
		const editor = vscode.window.activeTextEditor;
		const vars = editor.document.getText(editor.selection).replace(/[^a-zA-Z,]/g, "").split(',')
		let setters = ''
		vars.forEach(element => {
			setters += `\n	function set${element.charAt(0).toUpperCase() + element.substring(1)}($${element}) { `
				+ ` \n		$this->${element} = $${element}; \n	} \n`
		});
		editor.edit(edit => {
			edit.insert(new vscode.Position(editor.document.lineCount - 1, 0), setters)
		})
	}

	const getter = () => {
		const editor = vscode.window.activeTextEditor;
		const vars = editor.document.getText(editor.selection).replace(/[^a-zA-Z,]/g, "").split(',')
		let getters = ''
		vars.forEach(element => {
			getters += '\n	function get' + element.charAt(0).toUpperCase() + element.substring(1) + "() { \n " +
				'		return $this->' + element + '; \n	} \n'
		});
		editor.edit(edit => {
			edit.insert(new vscode.Position(editor.document.lineCount - 1, 0), getters)
		})
	}

	const getterAndSetter = vscode.commands.registerCommand('getter-setter-constructor-php.getterAndSetter', function () {
		const editor = vscode.window.activeTextEditor;
		const vars = editor.document.getText(editor.selection).replace(/[^a-zA-Z,]/g, "").split(',')
		let getters = ''
		let setters = ''
		vars.forEach(element => {
			getters += '\n	function get' + element.charAt(0).toUpperCase() + element.substring(1) + "() { \n " +
				'		return $this->' + element + '; \n	} \n'
			setters += `\n	function set${element.charAt(0).toUpperCase() + element.substring(1)}($${element}) { `
				+ ` \n		$this->${element} = $${element}; \n	} \n`

		});
		editor.edit(edit => {
			edit.insert(new vscode.Position(editor.document.lineCount - 1, 0), getters + setters)
		})
	});
	
	context.subscriptions.push(vscode.commands.registerCommand('getter-setter-constructor-php.getter', getter))
	context.subscriptions.push(vscode.commands.registerCommand('getter-setter-constructor-php.setter', setter))
	context.subscriptions.push(constructor);
	context.subscriptions.push(getterAndSetter);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
