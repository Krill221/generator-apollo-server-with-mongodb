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
    this.log("population", this.answers.population);
  }

  writing() {

    var text = this.fs.read(this.destinationPath(`graphql/models/${this.answers.model}.js`));
    var regEx1 = 'new Schema\\({';
    var regEx1New = `new Schema({\n\t${this.answers.small_populations}: [{\n\t\ttype: Schema.Types.ObjectId, ref: 'Object'\n\t}],`;
    text = text.toString().replace(new RegExp(regEx1, 'g'), regEx1New);
    this.fs.write(this.destinationPath(`graphql/models/${this.answers.model}.js`), text);

    var text2 = this.fs.read(this.destinationPath(`graphql/typeDefs/${this.answers.small_models}.js`));
    var regEx2 = `type ${this.answers.model} {`;
    var regEx2New = `type ${this.answers.model} {\n${this.answers.small_populations}: [ID]`;
    var regEx3 = `input ${this.answers.model}Input {`;
    var regEx3New = `input ${this.answers.model}Input {\n${this.answers.small_populations}: [ID]`;
    text2 = text2.toString().replace(new RegExp(regEx2, 'g'), regEx2New);
    text2 = text2.toString().replace(new RegExp(regEx3, 'g'), regEx3New);
    this.fs.write(this.destinationPath(`graphql/typeDefs/${this.answers.small_models}.js`), text2);


    var text3 = this.fs.read(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`));
    var regEx4 = `await item.save\\(\\);`;
    var regEx4New = `if ( ${this.answers.small_populations} !== undefined ) item.${this.answers.small_populations} = ${this.answers.small_populations};\n\t\t\t\tawait item.save();`;
    var regEx6 = `async update${this.answers.model}\\(_, { input: { `;
    var regEx6New = `async update${this.answers.model}(_, { input: { ${this.answers.small_populations}, `;
    text3 = text3.toString().replace( new RegExp(regEx4, 'g'), regEx4New);
    text3 = text3.toString().replace( new RegExp(regEx6, 'g'), regEx6New);
    this.fs.write(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`), text3);


  }

  install() {
    //this.installDependencies();
  }
};
