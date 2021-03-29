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

    // models
    var ModelsFile = this.fs.read(this.destinationPath(`graphql/models/${this.answers.population}.js`));
    var regEx1 = new RegExp('new Schema\\({', 'g');
    ModelsFile = ModelsFile.toString().replace(regEx1, `new Schema({\n\t${this.answers.small_model}Id: String,`);
    this.fs.write(this.destinationPath(`graphql/models/${this.answers.population}.js`), ModelsFile);

    // typeDefs
    var typeDefsFile = this.fs.read(this.destinationPath(`graphql/typeDefs/${this.answers.small_populations}.js`));
    var typeText = `type ${this.answers.population} \{`;
    var typeTextNew = `type ${this.answers.population} {\n${this.answers.small_model}Id: ID`;
    var inputText = `input ${this.answers.population}Input \{`;
    var inputTextNew = `input ${this.answers.population}Input {\n${this.answers.small_model}Id: ID`;
    var parentId = `parentId: ID`;
    var parentIdNew = `${this.answers.small_model}Id: ID`;
    typeDefsFile = typeDefsFile.toString().replace(new RegExp(typeText, 'g'), typeTextNew);
    typeDefsFile = typeDefsFile.toString().replace(new RegExp(inputText, 'g'), inputTextNew);
    typeDefsFile = typeDefsFile.toString().replace(new RegExp(parentId, 'g'), parentIdNew);
    this.fs.write(this.destinationPath(`graphql/typeDefs/${this.answers.small_populations}.js`), typeDefsFile);

    // resolvers
    var PopulationFile = this.fs.read(this.destinationPath(`graphql/resolvers/${this.answers.small_populations}.js`));
    var fieldsArray = `const fieldsArray = \\[`;
    var fieldsArrayNew = `const fieldsArray = [\'${this.answers.small_model}Id\', `;
    PopulationFile = PopulationFile.toString().replace(new RegExp(fieldsArray, 'g'), fieldsArrayNew);
    var belongTo = `const belongTo = \\[`;
    var belongToNew = `const belongTo = [\'${this.answers.small_model}Id\', `;
    PopulationFile = PopulationFile.toString().replace(new RegExp(belongTo, 'g'), belongToNew);
    var UpdateEstimate1 = `return Helper.Update\\(`;
    var UpdateEstimateNew1 = `//return Helper.Update(`;
    PopulationFile = PopulationFile.toString().replace(new RegExp(UpdateEstimate1, 'g'), UpdateEstimateNew1);
    var UpdateEstimate2 = `//return Helper.UpdateEstimate\\(`;
    var UpdateEstimateNew2 = `return Helper.UpdateEstimate(`;
    PopulationFile = PopulationFile.toString().replace(new RegExp(UpdateEstimate2, 'g'), UpdateEstimateNew2);
    this.fs.write(this.destinationPath(`graphql/resolvers/${this.answers.small_populations}.js`), PopulationFile);

    var MainFile = this.fs.read(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`));
    var Model = `// key model import`;
    var ModelNew = `// key model import\nconst ${this.answers.population} = require(\'../models/${this.answers.population}\');`;
    MainFile = MainFile.toString().replace(new RegExp(Model, 'g'), ModelNew);
    var HasMany = `const HasMany = \\[`;
    var HasManyNew = `const HasMany = [{model: ${this.answers.population}, parentKey: \'${this.answers.small_model}Id\'}, `;
    MainFile = MainFile.toString().replace(new RegExp(HasMany, 'g'), HasManyNew);   
    this.fs.write(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`), MainFile);

  }

  install() {
    //this.installDependencies();
  }
};
