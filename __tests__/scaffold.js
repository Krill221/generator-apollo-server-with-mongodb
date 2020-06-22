'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-apollo-server-with-mongodb:scaffold', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/scaffold'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['models/model.js']);
  });
});
