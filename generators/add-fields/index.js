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
    this.log("add new fields", this.answers.fields);
  }

  async prompting() {
  }

  writing() {
    
    // models
    var ModelsFile = this.fs.read(this.destinationPath(`graphql/models/${this.answers.model}.js`));
    var regEx1 = new RegExp('new Schema\\({', 'g');
    ModelsFile = ModelsFile.toString().replace(regEx1, `new Schema({\n\t${this.answers.fields.map(f => ( (f[1] === 'ID') ? `${f[0]}: {type: Schema.Types.ObjectId, ref: 'Object'}` : `${f[0]}: ${f[1]}`) ).join(',\n\t')},`);
    this.fs.write(this.destinationPath(`graphql/models/${this.answers.model}.js`), ModelsFile);

    // typeDefs
    var typeDefsFile = this.fs.read(this.destinationPath(`graphql/typeDefs/${this.answers.small_models}.js`));
    var typeText = `type ${this.answers.model} \{`;
    var typeTextNew = `type ${this.answers.model} {\n${this.answers.fields.map(f => `${f[0]}: ${f[1]}`).join('\n')}`;
    var inputText = `input ${this.answers.model}Input \{`;
    var inputTextNew = `input ${this.answers.model}Input {\n${this.answers.fields.map(f => `${f[0]}: ${f[1]}`).join('\n')}`;
    typeDefsFile = typeDefsFile.toString().replace(new RegExp(typeText, 'g'), typeTextNew);
    typeDefsFile = typeDefsFile.toString().replace(new RegExp(inputText, 'g'), inputTextNew);
    this.fs.write(this.destinationPath(`graphql/typeDefs/${this.answers.small_models}.js`), typeDefsFile);

    // resolvers
    var ResolversFile = this.fs.read(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`));
    var fieldsQuery = `const fieldsArray = \\[`;
    var fieldsQueryNew = `const fieldsArray = [${this.answers.fields.map(f => '\''+f[0]+'\'').join(', ')}, `;
    ResolversFile = ResolversFile.toString().replace(new RegExp(fieldsQuery, 'g'), fieldsQueryNew);
    this.fs.write(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`), ResolversFile);

  }

  install() {
    //this.installDependencies();
  }
};
