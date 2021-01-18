'use strict';
const Generator = require('yeoman-generator');
const pluralize = require('pluralize');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.conflicter.force = true;
    this.argument("model", { type: String, required: true });
    this.argument("population", { type: String, required: true });

    this.answers = {};
    this.answers.model = this.options.model.charAt(0).toUpperCase() + this.options.model.slice(1).toLowerCase();
    this.answers.models = pluralize(this.options.model.charAt(0).toUpperCase() + this.options.model.slice(1).toLowerCase());
    this.answers.small_models = pluralize(this.options.model.toLowerCase());
    this.answers.small_model = this.options.model.toLowerCase();
    this.answers.large_models = pluralize(this.options.model.toUpperCase());
    this.answers.large_model = this.options.model.toUpperCase();

    this.answers.population = this.options.population.charAt(0).toUpperCase() + this.options.population.slice(1).toLowerCase();
    this.answers.populations = pluralize(this.options.population.charAt(0).toUpperCase() + this.options.population.slice(1).toLowerCase());
    this.answers.small_populations = pluralize(this.options.population.toLowerCase());
    this.answers.small_population = this.options.population.toLowerCase();
    this.answers.large_populations = pluralize(this.options.population.toUpperCase());
    this.answers.large_population = this.options.population.toUpperCase();

    this.log("model", this.answers.model);
    this.log("delete population", this.answers.population);
  }

  writing() {

    var modelsFile = this.fs.read(this.destinationPath(`graphql/models/${this.answers.model}.js`));
    let modelsText = `\t${this.answers.small_populations}: \\[\\{[\\S\\s]*?\\}\\],\n`;
    modelsFile = modelsFile.toString().replace(new RegExp( modelsText, 'g'), '');
    this.fs.write(this.destinationPath(`graphql/models/${this.answers.model}.js`), modelsFile);

    var typeDefsFile = this.fs.read(this.destinationPath(`graphql/typeDefs/${this.answers.small_models}.js`));
    let fieldText = `${this.answers.small_populations}: \\[ID\\]\n`;
    typeDefsFile = typeDefsFile.toString().replace(new RegExp(fieldText, 'g'), '');
    this.fs.write(this.destinationPath(`graphql/typeDefs/${this.answers.small_models}.js`), typeDefsFile);

    var resolversFile = this.fs.read(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`));
    let regEx4 = new RegExp(`\t\t\t\tif \\( ${this.answers.small_populations} !== undefined \\) item.${this.answers.small_populations} = ${this.answers.small_populations};\n`, 'g');
    let regEx6 = new RegExp(`${this.answers.small_populations}, `, 'g');
    resolversFile = resolversFile.toString().replace(regEx4, '');
    resolversFile = resolversFile.toString().replace(regEx6, '');    
    this.fs.write(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`), resolversFile);
    
  }

  install() {
    //this.installDependencies();
  }
};
