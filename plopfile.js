const generator = require("./dist/index").default;

const defaultConfig = {
	createIndex: true,
	functional: true,
	basePath: "src/ui/components",
	withClassnameInterfaceImportPath: "/framework/ui", //make sure to configure this path
	withStyleInterfaceImportPath: "/framework/ui",
	tests: true,
	stories: true,
	styledComponents: false,
	useNative: false,
	useMacro: false,
	typeFormatter: "pascaleCase",
	fileNameFormatter: "pascaleCase",
	dirNameFormatter: "lowerCase",
};

const config = (plop) => {
	generator(plop, defaultConfig);
};

module.exports = config;
