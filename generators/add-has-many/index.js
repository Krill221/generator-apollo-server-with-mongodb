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

  async prompting() {
  }

  writing() {
    
    var text = this.fs.read(this.destinationPath(`models/${this.answers.model}.js`));
    var regEx1 = new RegExp('new Schema\\({', 'g');
    text = text.toString().replace(regEx1, `new Schema({\n\t${this.answers.small_populations}: [{\n\t\ttype: Schema.Types.ObjectId, ref: 'Object'\n\t}],`);
    this.fs.write(this.destinationPath(`models/${this.answers.model}.js`), text);


    var text2 = this.fs.read(this.destinationPath(`graphql/typeDefs.js`));
    var regEx2 = new RegExp(`type ${this.answers.model} {`, 'g');
    var regEx3 = new RegExp(`update${this.answers.model}\\(`, 'g');
    text2 = text2.toString().replace(regEx2, `type ${this.answers.model} {\n\t\t${this.answers.small_populations}: [ID]`);
    text2 = text2.toString().replace(regEx3, `update${this.answers.model}(\n\t\t\t${this.answers.small_populations}: [ID],`);
    this.fs.write(this.destinationPath(`graphql/typeDefs.js`), text2);

    
    var text3 = this.fs.read(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`));

    var regEx4 = new RegExp(`await item.save\\(\\);`, 'g');
    var regEx6 = new RegExp(`async update${this.answers.model}\\(_, { `, 'g');
    text3 = text3.toString().replace(regEx4, `if ( ${this.answers.small_populations} !== undefined ) item.${this.answers.small_populations} = ${this.answers.small_populations};\n\t\t\t\tawait item.save();`);
    text3 = text3.toString().replace(regEx6, `async update${this.answers.model}(_, { ${this.answers.small_populations}, `);

    this.fs.write(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`), text3);



  }

  install() {
    //this.installDependencies();
  }
};
