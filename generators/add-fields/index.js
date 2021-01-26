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
    var resNewText = `new ${this.answers.model}\\({`;
    var resNewTextNew = `new ${this.answers.model}({\n\t\t\t\t\t\t${this.answers.fields.map(f => `${f[0]}`).join(',\n\t\t\t\t\t\t')},`;
    var awaitText = `item = await ${this.answers.model}.findById\\(id\\);`;
    var awaitTextNew = `item = await ${this.answers.model}.findById(id);\n\t\t\t\t\t${this.answers.fields.map(f => `if (${f[0]} !== undefined) item.${f[0]} = ${f[0]};`).join('\n\t\t\t\t\t')}`;
    var asyncUpdateText = `async update${this.answers.model}\\(_, { input: { `;
    var asyncUpdateTextNew = `async update${this.answers.model}(_, { input: { ${this.answers.fields.map(f => f[0]).join(', ')}, `;
    ResolversFile = ResolversFile.toString().replace(new RegExp(resNewText, 'g'), resNewTextNew);
    ResolversFile = ResolversFile.toString().replace(new RegExp(awaitText, 'g'), awaitTextNew);
    ResolversFile = ResolversFile.toString().replace(new RegExp(asyncUpdateText, 'g'), asyncUpdateTextNew);
    this.fs.write(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`), ResolversFile);


  }

  install() {
    //this.installDependencies();
  }
};
