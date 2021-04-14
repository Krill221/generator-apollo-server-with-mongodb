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

    // models
    var ModelsFile = this.fs.read(this.destinationPath(`graphql/models/${this.answers.population}.js`));
    var parentId = `\n\t${this.answers.small_model}Id: String,`;
    ModelsFile = ModelsFile.toString().replace(new RegExp(parentId, 'g'), '');
    this.fs.write(this.destinationPath(`graphql/models/${this.answers.population}.js`), ModelsFile);
    
    // typeDef
    var typeDefsFile = this.fs.read(this.destinationPath(`graphql/typeDefs/${this.answers.small_populations}.js`));
    var fieldsParent = `'${this.answers.small_model}Id: ID',\n`;
    var fieldsPopulate = `'${this.answers.small_model}Id: ${this.answers.model}',\n`;
    typeDefsFile = typeDefsFile.toString().replace(new RegExp(fieldsParent, 'g'), '');
    typeDefsFile = typeDefsFile.toString().replace(new RegExp(fieldsPopulate, 'g'), '');
    this.fs.write(this.destinationPath(`graphql/typeDefs/${this.answers.small_populations}.js`), typeDefsFile);

    // resolvers
    var PopulationFile = this.fs.read(this.destinationPath(`graphql/resolvers/${this.answers.small_populations}.js`));
    var fieldsArray = `\'${this.answers.small_model}Id\', `;
    PopulationFile = PopulationFile.toString().replace(new RegExp(fieldsArray, 'g'), '');
    var belongTo = `\'${this.answers.small_model}Id\', `;
    PopulationFile = PopulationFile.toString().replace(new RegExp(belongTo, 'g'), '');
    var UpdateEstimate1 = `//return Helper.Update\\(`;
    var UpdateEstimateNew1 = `return Helper.Update(`;
    PopulationFile = PopulationFile.toString().replace(new RegExp(UpdateEstimate1, 'g'), UpdateEstimateNew1);
    var UpdateEstimate2 = `return Helper.UpdateEstimate\\(`;
    var UpdateEstimateNew2 = `//return Helper.UpdateEstimate(`;
    PopulationFile = PopulationFile.toString().replace(new RegExp(UpdateEstimate2, 'g'), UpdateEstimateNew2);
    this.fs.write(this.destinationPath(`graphql/resolvers/${this.answers.small_populations}.js`), PopulationFile);

    var MainFile = this.fs.read(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`));
    var Model = `\nconst ${this.answers.population} = require\\(\'../models/${this.answers.population}\'\\);`;
    MainFile = MainFile.toString().replace(new RegExp(Model, 'g'), '');
    var HasMany = `\\{model: ${this.answers.population}, parentKey: \'${this.answers.small_model}Id\'\\}, `;
    MainFile = MainFile.toString().replace(new RegExp(HasMany, 'g'), '');
    this.fs.write(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`), MainFile);

  }

  install() {
    //this.installDependencies();
  }
};
