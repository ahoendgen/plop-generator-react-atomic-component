import { NodePlopAPI } from "node-plop";
import { FileNameFormatters } from "./types";
export interface GeneratorConfig {
	additionalTemplates:
		| {
				name: string;
				extension: string;
		  }[]
		| false;
	choices: string[];
	createIndex: boolean;
	createStyles: boolean;
	functional: boolean;
	basePath: string;
	withClassnameInterfaceImportPath: string;
	withStyleInterfaceImportPath: string;
	tests: boolean;
	stories: boolean;
	styledComponents: boolean;
	useNative: boolean;
	useMacro: boolean;
	templateIndex?: string;
	templateStory?: string;
	templateStyles?: string;
	templateTest?: string;
	templateComponentFunctional?: string;
	templateComponentClassBased?: string;
	typeFormatter?: FileNameFormatters;
	fileNameFormatter?: FileNameFormatters;
	dirNameFormatter?: FileNameFormatters;
}
declare const generator: (
	plop: NodePlopAPI,
	config: Partial<GeneratorConfig>
) => void;
export default generator;
