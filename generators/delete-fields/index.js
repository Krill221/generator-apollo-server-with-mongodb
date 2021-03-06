'use strict';
const Generator = require('yeoman-generator');
const pluralize = require('pluralize');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.conflicter.force = true;
    this.argument("model", { type: String, required: true });
    this.argument("fields", { type: Array, required: true });

    this.answers = {};
    this.answers.model = this.options.model.charAt(0).toUpperCase() + this.options.model.slice(1).toLowerCase();
    this.answers.models = pluralize(this.options.model.charAt(0).toUpperCase() + this.options.model.slice(1).toLowerCase());
    this.answers.small_models = pluralize(this.options.model.toLowerCase());
    this.answers.small_model = this.options.model.toLowerCase();
    this.answers.large_models = pluralize(this.options.model.toUpperCase());
    this.answers.large_model = this.options.model.toUpperCase();
    this.answers.fields = [];
    this.options.fields.map(field => this.answers.fields.push(field.split(':')));
    this.log("model", this.answers.model);
    this.log("delete fields", this.answers.fields);
  }

  async prompting() {
  }

  writing() {

    var modelFile = this.fs.read(this.destinationPath(`graphql/models/${this.answers.model}.js`));
    var typeDefsFile = this.fs.read(this.destinationPath(`graphql/typeDefs/${this.answers.small_models}.js`));
    this.answers.fields.forEach(f => {
      let regEx1 = new RegExp(`\t${f[0]}: ${f[1]},\n`, 'g');
      let regEx2 = new RegExp(`    ${f[0]}: ${f[1]},\n`, 'g');
      let regEx1ID = new RegExp(`\t${f[0]}: \\{type: Schema.Types.ObjectId, ref: 'Object'\\},\n`, 'g');
      let regEx2ID = new RegExp(`    ${f[0]}: \\{type: Schema.Types.ObjectId, ref: 'Object'\\},\n`, 'g');
      modelFile = modelFile.toString().replace(regEx1, '');
      modelFile = modelFile.toString().replace(regEx2, '');
      modelFile = modelFile.toString().replace(regEx1ID, '');
      modelFile = modelFile.toString().replace(regEx2ID, '');

      let fieldText = `'${f[0]}: ${f[1]}',\n`;
      typeDefsFile = typeDefsFile.toString().replace(new RegExp(fieldText, 'g'), '');
    });
    this.fs.write(this.destinationPath(`graphql/models/${this.answers.model}.js`), modelFile);
    this.fs.write(this.destinationPath(`graphql/typeDefs/${this.answers.small_models}.js`), typeDefsFile);

    // resolvers
    var resFile = this.fs.read(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`));
    var fieldsQuery = `${this.answers.fields.map(f => '\''+f[0]+'\'').join(', ')}, `;
    resFile = resFile.toString().replace(new RegExp(fieldsQuery, 'g'), '');
    this.fs.write(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`), resFile);

  }

  install() {
    //this.installDependencies();
  }
};
