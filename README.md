# plop generator react atomic component

_An opinionated [`plop`][plop] generator for [`typescript`][typescript] [`atomic`][atomic] [`react`][react] components._

## Installation

This package is hosted on [`npm`][npm].

```bash
npm install --save-dev @a9g/plop-generator-react-atomic-component
```

## Usage

First, create two interfaces to include classnames or styles (depending on if you are using react-native or not) to include them into your props. h

```typescript
import { StyleProp, ViewStyle } from "react-native";

export interface PropsWithClassName {
  className?: string;
}

export interface PropsWithStyle {
  style?: StyleProp<ViewStyle>;
}
```

Afterwards, be sure you have [`plop`][plop] installed. Then, add the following lines to your `plopfile.js`.

```javascript
const atomicGenerator =
  require("@a9g/plop-generator-react-atomic-component").default;

const defaultConfig = {
  createIndex: true,
  functional: true,
  basePath: "src/ui/components",
  withClassnameInterfaceImportPath: "/framework/ui", //make sure to configure this path
  withStyleInterfaceImportPath: "/framework/ui",
  tests: true,
  stories: true,
  styledComponents: true,
  useNative: false, // native and macro can't be used together
  useMacro: false,
  typeFormatter: "pascaleCase",
  fileNameFormatter: "pascaleCase",
  dirNameFormatter: "pascaleCase"
};

atomicGenerator(plop, defaultConfig);
```

so your `plopfile.js` could look e.g. like this

```javascript
const atomicGenerator =
  require("@a9g/plop-generator-react-atomic-component").default;

const defaultConfig = {
  createIndex: true,
  functional: true,
  basePath: "src/ui/components",
  withClassnameInterfaceImportPath: "/framework/ui", //make sure to configure this path
  withStyleInterfaceImportPath: "/framework/ui",
  tests: true,
  stories: true,
  styledComponents: true,
  useNative: false,
  useMacro: false,
  typeFormatter: "pascaleCase",
  fileNameFormatter: "pascaleCase",
  dirNameFormatter: "pascaleCase"
};

const config = plop => {
  atomicGenerator(plop, defaultConfig);
};

module.exports = config;
```

Now you'll have access to the `atomic-component` generator as shown below.

```bash
plop atomic-component
```

```text
src
└── ui
   └── components
      └── $Type
         └── $ComponentName
            ├── $ComponentName.tsx
            ├── $ComponentName.test.tsx (optional)
            ├── $ComponentName.stories.tsx (optional)
            ├── $ComponentName.styles.ts (optional)
            └── index.tsx (optional)
```

## Configuration

```typescript
export interface GeneratorConfig {
  createIndex: boolean; //create an index file
  createStyles: boolean; //create a styles file
  functional: boolean; //should the template be functional or class based?
  basePath: string; //where do you want to store the generated files
  withClassnameInterfaceImportPath: string; //from where can we import the classname interface
  withStyleInterfaceImportPath: string; //from where can we import the styles interface
  tests: boolean; //create test files
  stories: boolean; //create story files
  styledComponents: boolean; //use styled components
  useNative: boolean; //use react native
  useMacro: boolean; // use styled components macro import. native and macro can't be used together
  templateIndex?: string; //path to the corresponding files, need to be an absolute path
  templateStory?: string;
  templateStyles?: string;
  templateTest?: string;
  templateComponentFunctional?: string;
  templateComponentClassBased?: string;
  typeFormatter?: FileNameFormatters;
  fileNameFormatter?: FileNameFormatters;
  dirNameFormatter?: FileNameFormatters;
}
```

### FileNameFormatters

```typescript
export enum FileNameFormatters {
  "pascalCase" = "pascalCase",
  "camelCase" = "camelCase",
  "kebabCase" = "kebabCase",
  "snakeCase" = "snakeCase",
  "lowerCase" = "lowerCase"
}
```

## Questions

Report bugs or provide feedback by filing [issues][issues]

## License

MIT see [license.md](license.md)

[npm]: https://www.npmjs.com/package/@a9g/plop-generator-react-atomic-component
[issues]: https://github.com/ahoendgen/plop-generator-react-atomic-component/issues
[plop]: https://plopjs.com
[react]: https://reactjs.org
[typescript]: https://typescriptlang.org
[atomic]: https://atomicdesign.bradfrost.com/
