import { NodePlopAPI } from "node-plop";
import * as path from "path";
import { GeneratorConfig } from "./index";
import * as fs from "fs";
import { FileNameFormatters } from "./types";

const atomicComponent = (
	config: Partial<GeneratorConfig>,
	plop: NodePlopAPI
) => {
	const defaultConfig: GeneratorConfig = {
		createIndex: true,
		createStyles: true,
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
		choices: [
			"Atoms",
			"Molecules",
			"Organisms",
			"Templates",
			"Page-Components",
		],
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
	let testId = "data-testid";
	let withClassNameClassName = `className={${
		IS_FUNCTIONAL ? "" : "this."
	}props.className} `;
	let withClassNameProps = "interface Props extends PropsWithClassName";
	let withClassNameImport = `import {PropsWithClassName} from '${fullConfig.withClassnameInterfaceImportPath}'`;

	let typeFormatter: FileNameFormatters = FileNameFormatters.pascalCase;
	let dirNameFormatter: FileNameFormatters = FileNameFormatters.pascalCase;
	let fileNameFormatter: FileNameFormatters = FileNameFormatters.pascalCase;

	if (
		fullConfig.typeFormatter &&
		Object.values(FileNameFormatters).includes(fullConfig.typeFormatter)
	) {
		typeFormatter = fullConfig.typeFormatter;
	}

	if (
		fullConfig.dirNameFormatter &&
		Object.values(FileNameFormatters).includes(fullConfig.dirNameFormatter)
	) {
		dirNameFormatter = fullConfig.dirNameFormatter;
	}

	if (
		fullConfig.fileNameFormatter &&
		Object.values(FileNameFormatters).includes(fullConfig.fileNameFormatter)
	) {
		fileNameFormatter = fullConfig.fileNameFormatter;
	}

	let formattedType = `{{${typeFormatter} type}}`;
	let formattedDirName = `{{${dirNameFormatter} name}}`;
	let formattedFileName = `{{${fileNameFormatter} name}}`;

	if (fullConfig.useMacro) {
		styledComponentsType = "styled-components/macro";
	}

	if (IS_NATIVE) {
		styledComponentsType = "styled-components/native";
		baseComponent = "Text";
		testId = "testID";
		withClassNameClassName = `style={${
			IS_FUNCTIONAL ? "" : "this."
		}props.style} `;
		withClassNameProps = "interface Props extends PropsWithNativeStyle";
		withClassNameImport = `import {PropsWithNativeStyle} from '${fullConfig.withStyleInterfaceImportPath}'`;
	}

	let styleImport = `import {Root} from './${formattedFileName}.styles'`;
	let templateBaseComponent = "Root";

	if (!WITH_STYLED_COMPONENTS) {
		styleImport = "";
		templateBaseComponent = "div";
		if (IS_NATIVE) {
			templateBaseComponent = "Text";
		}
	}

	data = {
		styledComponents: fullConfig.styledComponents,
		baseComponent,
		styledComponentsType,
		templateBaseComponent,
		withClassNameClassName,
		withClassNameProps,
		testId,
	};

	plop.setPartial("testId", testId);
	plop.setPartial("styleImport", styleImport);
	plop.setPartial("withClassNameImport", withClassNameImport);
	plop.setPartial("withClassNameClassName", withClassNameClassName);

	const CURRENT_DIR = path.resolve(__dirname);

	if (fullConfig.createIndex) {
		let indexTemplateFile = CURRENT_DIR + "/templates/index.hbs";

		if (fullConfig.templateIndex !== undefined) {
			if (fs.existsSync(fullConfig.templateIndex)) {
				indexTemplateFile = fullConfig.templateIndex;
			}
		}

		actions.push({
			type: "add",
			path:
				fullConfig.basePath + `/${formattedType}/${formattedDirName}/index.ts`,
			templateFile: indexTemplateFile,
			data,
		});
	}

	if (fullConfig.functional) {
		let functionalTemplateFile =
			CURRENT_DIR + "/templates/component_functional.hbs";

		if (fullConfig.templateComponentFunctional !== undefined) {
			if (fs.existsSync(fullConfig.templateComponentFunctional)) {
				functionalTemplateFile = fullConfig.templateComponentFunctional;
			}
		}
		actions.push({
			type: "add",
			path:
				fullConfig.basePath +
				`/${formattedType}/${formattedDirName}/${formattedFileName}.tsx`,
			templateFile: functionalTemplateFile,
			data,
		});
	} else {
		let classBasedTemplateFile =
			CURRENT_DIR + "/templates/component_class_based.hbs";

		if (fullConfig.templateComponentClassBased !== undefined) {
			if (fs.existsSync(fullConfig.templateComponentClassBased)) {
				classBasedTemplateFile = fullConfig.templateComponentClassBased;
			}
		}
		actions.push({
			type: "add",
			path:
				fullConfig.basePath +
				`/${formattedType}/${formattedDirName}/${formattedFileName}.tsx`,
			templateFile: classBasedTemplateFile,
			data,
		});
	}

	if (fullConfig.tests) {
		let testTemplateFile = CURRENT_DIR + "/templates/test.hbs";

		if (fullConfig.templateTest !== undefined) {
			if (fs.existsSync(fullConfig.templateTest)) {
				testTemplateFile = fullConfig.templateTest;
			}
		}
		actions.push({
			type: "add",
			path:
				fullConfig.basePath +
				`/${formattedType}/${formattedDirName}/${formattedFileName}.test.tsx`,
			templateFile: testTemplateFile,
			data,
		});
	}

	if (fullConfig.stories) {
		let storyTemplateFile = CURRENT_DIR + "/templates/story.hbs";

		if (fullConfig.templateStory !== undefined) {
			if (fs.existsSync(fullConfig.templateStory)) {
				storyTemplateFile = fullConfig.templateStory;
			}
		}
		actions.push({
			type: "add",
			path:
				fullConfig.basePath +
				`/${formattedType}/${formattedDirName}/${formattedFileName}.stories.tsx`,
			templateFile: storyTemplateFile,
			data,
		});
	}
	let stylesTemplateFile = CURRENT_DIR + "/templates/styles.hbs";

	if (fullConfig.templateStyles !== undefined) {
		if (fs.existsSync(fullConfig.templateStyles)) {
			stylesTemplateFile = fullConfig.templateStyles;
		}
	}

	if (fullConfig.createStyles) {
		actions.push({
			type: "add",
			path:
				fullConfig.basePath +
				`/${formattedType}/${formattedDirName}/${formattedFileName}.styles.ts`,
			templateFile: stylesTemplateFile,
			data,
		});
	}

	return {
		description: "⚛ react component",
		prompts,
		actions,
	};
};

export default atomicComponent;
