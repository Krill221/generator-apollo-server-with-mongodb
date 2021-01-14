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
    var ModelsFile = this.fs.read(this.destinationPath(`models/${this.answers.model}.js`));
    var regEx1 = new RegExp('new Schema\\({', 'g');
    ModelsFile = ModelsFile.toString().replace(regEx1, `new Schema({\n\t${this.answers.fields.map(f => ( (f[1] === 'ID') ? `${f[0]}: {type: Schema.Types.ObjectId, ref: 'Object'}` : `${f[0]}: ${f[1]}`) ).join(',\n\t')},`);
    this.fs.write(this.destinationPath(`models/${this.answers.model}.js`), ModelsFile);

    // typeDefs
    var typeDefsFile = this.fs.read(this.destinationPath(`graphql/typeDefs.js`));
    var typeText = new RegExp(`type ${this.answers.model} {`, 'g');
    var updateText = new RegExp(`update${this.answers.model}\\(`, 'g');
    typeDefsFile = typeDefsFile.toString().replace(typeText, `type ${this.answers.model} {\n\t\t${this.answers.fields.map(f => `${f[0]}: ${f[1]}`).join('\n\t\t')}`);
    typeDefsFile = typeDefsFile.toString().replace(updateText, `update${this.answers.model}(\n\t\t\t${this.answers.fields.map(f => `${f[0]}: ${f[1]}`).join(',\n\t\t\t')},`);
    this.fs.write(this.destinationPath(`graphql/typeDefs.js`), typeDefsFile);

    // resolvers
    var ResolversFile = this.fs.read(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`));
    var newText = new RegExp(`new ${this.answers.model}\\({`, 'g');
    var awaitText = new RegExp(`item = await ${this.answers.model}.findById\\(id\\);`, 'g');
    var asyncUpdateText = new RegExp(`async update${this.answers.model}\\(_, { `, 'g');
    ResolversFile = ResolversFile.toString().replace(newText, `new ${this.answers.model}({\n\t\t\t\t\t\t${this.answers.fields.map(f => `${f[0]}`).join(',\n\t\t\t\t\t\t')},`);
    ResolversFile = ResolversFile.toString().replace(awaitText, `item = await ${this.answers.model}.findById(id);\n\t\t\t\t\t${this.answers.fields.map(f => `if (${f[0]} !== undefined) item.${f[0]} = ${f[0]};`).join('\n\t\t\t\t\t')}`);
    ResolversFile = ResolversFile.toString().replace(asyncUpdateText, `async update${this.answers.model}(_, { ${this.answers.fields.map(f => f[0]).join(', ')}, `);
    this.fs.write(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`), ResolversFile);


  }

  install() {
    //this.installDependencies();
  }
};
