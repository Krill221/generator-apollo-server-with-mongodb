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

  async prompting() {
  }

  writing() {

    var text = this.fs.read(this.destinationPath(`models/${this.answers.model}.js`));
    var text2 = this.fs.read(this.destinationPath(`graphql/typeDefs.js`));
    var text3 = this.fs.read(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`));
    let regEx1 = new RegExp(`\t${this.answers.small_population}: \\{[\\S\\s]*?\\},\n`, 'g');
    text = text.toString().replace(regEx1, '');
    
    let regEx2 = new RegExp(`type ${this.answers.model} \\{[\\S\\s]*?\\}`, 'g');
    text2 = text2.toString().replace(regEx2, (substr) => {
      let regEx = new RegExp(`\t\t${this.answers.small_population}: ${this.answers.population}\n`, 'g');
      substr = substr.replace(regEx, '');
      return substr;
    });

    let regEx3 = new RegExp(`update${this.answers.model}\\([\\S\\s]*?\\)`, 'g');
    text2 = text2.toString().replace(regEx3, (substr) => {
      let regEx = new RegExp(`\t\t\t${this.answers.small_population}: ID,\n`, 'g');
      substr = substr.replace(regEx, '');
      return substr;
    });

    let regEx4 = new RegExp(`\t\t\t\t\tif \\(${this.answers.small_population} !== undefined\\) item.${this.answers.small_population} = ${this.answers.small_population};\n`, 'g');
    let regEx5 = new RegExp(`\t\t\t\t\t\t${this.answers.small_population},\n`, 'g');
    let regEx6 = new RegExp(`${this.answers.small_population}, `, 'g');
    let regExpP = new RegExp(`\\.populate\\('${this.answers.small_population}'\\)`, 'g');
    text3 = text3.toString().replace(regEx4, '');
    text3 = text3.toString().replace(regEx5, '');
    text3 = text3.toString().replace(regEx6, '');
    text3 = text3.toString().replace(regExpP, '');


    this.fs.write(this.destinationPath(`models/${this.answers.model}.js`), text);
    this.fs.write(this.destinationPath(`graphql/typeDefs.js`), text2);
    this.fs.write(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`), text3);

  }

  install() {
    //this.installDependencies();
  }
};
