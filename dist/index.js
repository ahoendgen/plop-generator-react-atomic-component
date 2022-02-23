"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const atomicComponent_1 = (0, tslib_1.__importDefault)(
	require("./atomicComponent")
);
const generator = (plop, config) => {
	const component = (0, atomicComponent_1.default)(config, plop);
	plop.setDefaultInclude({ generators: true });
	plop.setGenerator("atomic-component", component);
};
exports.default = generator;
//# sourceMappingURL=index.js.map
