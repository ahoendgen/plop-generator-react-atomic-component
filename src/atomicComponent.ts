import { NodePlopAPI } from "node-plop";
import * as path from "path";
import { GeneratorConfig } from "index";

const atomicComponent = (
	config: Partial<GeneratorConfig>,
	plop: NodePlopAPI
) => {
	const defaultConfig: GeneratorConfig = {
		createIndex: true,
		functional: true,
		basePath: "src/ui/components",
		withClassnameInterfaceImportPath: "/framework/ui",
		withStyleInterfaceImportPath: "/framework/ui",
		tests: true,
		stories: true,
		styledComponents: true,
		useNative: false, // native and macro can't be used together
		useMacro: false,
	};

	let fullConfig: GeneratorConfig = {
		...defaultConfig,
		...config,
	};

	const prompts = [];

	prompts.push({
		type: "list",
		name: "type",
		message: "component type",
		choices: ["Atom", "Molecule", "Organism", "Template", "Page"],
	});

	prompts.push({
		type: "input",
		name: "name",
		message: "component name",
	});

	const actions = [];
	let data = {};

	const IS_NATIVE = fullConfig.useNative;
	const IS_FUNCTIONAL = fullConfig.functional;
	const WITH_STYLED_COMPONENTS = fullConfig.styledComponents;

	let styledComponentsType = "styled-components";
	let baseComponent = "div";
	let withClassNameClassName = `className={${
		IS_FUNCTIONAL ? "" : "this."
	}props.className} `;
	let withClassNameProps = "interface Props extends PropsWithClassName";
	let withClassNameImport = `import {PropsWithClassName} from "${fullConfig.withClassnameInterfaceImportPath}";\n`;

	if (fullConfig.useMacro) {
		styledComponentsType = "styled-components/macro";
	}

	if (IS_NATIVE) {
		styledComponentsType = "styled-components/native";
		baseComponent = "Text";
		withClassNameClassName = `style={${
			IS_FUNCTIONAL ? "" : "this."
		}props.style} `;
		withClassNameProps = "interface Props extends PropsWithNativeStyle";
		withClassNameImport = `import {PropsWithNativeStyle} from "${fullConfig.withStyleInterfaceImportPath}";\n`;
	}

	let styleImport = `\nimport {Root} from './{{pascalCase name}}.styles';`;
	let templateBaseComponent = "Root";

	if (!WITH_STYLED_COMPONENTS) {
		styleImport = "";
		templateBaseComponent = "div";
		if (IS_NATIVE) {
			templateBaseComponent = "Text";
		}
	}

	data = {
		templateBaseComponent,
		withClassNameProps,
		withClassNameClassName,
		baseComponent,
		styledComponentsType,
	};
	plop.setPartial("styleImport", styleImport);
	plop.setPartial("withClassNameImport", withClassNameImport);
	plop.setPartial("withClassNameClassName", withClassNameClassName);

	const CURRENT_DIR = path.resolve(__dirname);

	if (fullConfig.createIndex) {
		actions.push({
			type: "add",
			path:
				fullConfig.basePath +
				"/{{pascalCase type }}//{{pascalCase name}}/index.ts",
			templateFile: CURRENT_DIR + "/templates/index.hbs",
			data,
		});
	}

	if (fullConfig.functional) {
		actions.push({
			type: "add",
			path:
				fullConfig.basePath +
				"/{{pascalCase type }}/{{pascalCase name}}/{{pascalCase name}}.tsx",
			templateFile: CURRENT_DIR + "/templates/component_functional.hbs",
			data,
		});
	} else {
		actions.push({
			type: "add",
			path:
				fullConfig.basePath +
				"/{{pascalCase type }}/{{pascalCase name}}/{{pascalCase name}}.tsx",
			templateFile: CURRENT_DIR + "/templates/component_class_based.hbs",
			data,
		});
	}

	if (fullConfig.tests) {
		actions.push({
			type: "add",
			path:
				fullConfig.basePath +
				"/{{pascalCase type}}/{{pascalCase name}}/{{pascalCase name}}.test.tsx",
			templateFile: CURRENT_DIR + "/templates/test.hbs",
			data,
		});
	}

	if (fullConfig.stories) {
		actions.push({
			type: "add",
			path:
				fullConfig.basePath +
				"/{{pascalCase type }}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
			templateFile: CURRENT_DIR + "/templates/story.hbs",
			data,
		});
	}

	actions.push({
		type: "add",
		path:
			fullConfig.basePath +
			"/{{pascalCase type }}/{{pascalCase name}}/{{pascalCase name}}.styles.ts",
		templateFile: CURRENT_DIR + "/templates/styles.hbs",
		data,
	});

	return {
		description: "⚛ react component",
		prompts,
		actions,
	};
};

export default atomicComponent;
