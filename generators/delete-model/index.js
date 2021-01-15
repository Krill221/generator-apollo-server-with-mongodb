'use strict';
const Generator = require('yeoman-generator');
const pluralize = require('pluralize');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.conflicter.force = true;
    this.argument("model", { type: String, required: true });

    this.answers = {};
    this.answers.model = this.options.model.charAt(0).toUpperCase() + this.options.model.slice(1).toLowerCase();
    this.answers.models = pluralize(this.options.model.charAt(0).toUpperCase() + this.options.model.slice(1).toLowerCase());
    this.answers.small_models = pluralize(this.options.model.toLowerCase());
    this.answers.small_model = this.options.model.toLowerCase();
    this.answers.large_models = pluralize(this.options.model.toUpperCase());
    this.answers.large_model = this.options.model.toUpperCase();
    this.log("model", this.answers.model);
  }

  writing() {
    

    this.fs.delete(this.destinationPath(`graphql/models/${this.answers.model}.js`));
    this.fs.delete(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`));
    this.fs.delete(this.destinationPath(`graphql/typeDefs/${this.answers.small_models}.js`));

    var resolversFile = this.fs.read(this.destinationPath('graphql/resolvers/index.js'));
    var resolverTop = `\nconst ${this.answers.small_models} = require\\('./${this.answers.small_models}'\\);`
    var resolverQ = `\n\t\t...${this.answers.small_models}.Query,`;
    var resolverM = `\n\t\t...${this.answers.small_models}.Mutation,`;
    resolversFile = resolversFile.toString().replace( new RegExp(resolverTop, 'g'), '' );
    resolversFile = resolversFile.toString().replace( new RegExp(resolverQ, 'g'), '');
    resolversFile = resolversFile.toString().replace( new RegExp(resolverM, 'g'), '');
    this.fs.write(this.destinationPath('graphql/resolvers/index.js'), resolversFile);


    var typeFile = this.fs.read(this.destinationPath('graphql/typeDefs/index.js'));
    var typeTop = `\nconst ${this.answers.small_models} = require\\('./${this.answers.small_models}'\\);`
    var typeGql1 = `\n\t\\$\{${this.answers.small_models}.Type\}`;
    var typeGql2 = `\n\t\\$\{${this.answers.small_models}.Input\}`;
    var typeQ = `\n\t\t\\$\{${this.answers.small_models}.Query\}`;
    var typeM = `\n\t\t\\$\{${this.answers.small_models}.Mutation\}`;
    typeFile = typeFile.toString().replace( new RegExp(typeTop, 'g'), '' );
    typeFile = typeFile.toString().replace( new RegExp(typeGql1, 'g'), '');
    typeFile = typeFile.toString().replace( new RegExp(typeGql2, 'g'), '');
    typeFile = typeFile.toString().replace( new RegExp(typeQ, 'g'), '');
    typeFile = typeFile.toString().replace( new RegExp(typeM, 'g'), '');
    this.fs.write(this.destinationPath('graphql/typeDefs/index.js'), typeFile);

  }

  install() {
    //this.installDependencies();
  }
};
