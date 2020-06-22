const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-apollo-server-with-mongodb:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ name: "myProject", projectAuthor: "my-name" });
  });

  it("creates files with proper content", () => {
    assert.file([
      "package.json",
      "index.js",
      "models/index.js",
      "resolvers/index.js",
      "typeDefs/index.js",
      ".gitignore",
      ".env",
    ]);

    // assert.fileContent('package.json', '"name": "myProject"')
    // assert.fileContent('package.json', '"author": "my-name"')
    assert.fileContent('index.js', 'port = process.env.PORT || 4000')
  });
});
