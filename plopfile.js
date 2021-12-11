const generator = require("./dist/index").default;

const config = plop => {
    generator(plop);
}

module.exports = config
