import { NodePlopAPI } from "node-plop";
import { GeneratorConfig } from "./index";
declare const atomicComponent: (
	config: Partial<GeneratorConfig>,
	plop: NodePlopAPI
) => {
	description: string;
	prompts: (
		| {
				type: string;
				name: string;
				message: string;
				choices: string[];
		  }
		| {
				type: string;
				name: string;
				message: string;
				choices?: undefined;
		  }
	)[];
	actions: {
		type: string;
		path: string;
		templateFile: string;
		data: {};
	}[];
};
export default atomicComponent;
