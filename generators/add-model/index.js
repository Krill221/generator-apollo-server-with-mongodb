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
    this.answers.small_models = pluralize(this.options.model.toLowerCase());
    this.answers.small_model = this.options.model.toLowerCase();
    this.answers.fields = [];
    this.options.fields.map(field => this.answers.fields.push(field.split(':')));
    this.log("new model", this.answers.model);
    this.log("with fields", this.answers.fields);

  }

  async prompting() {
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('graphql/models/model.js'),
      this.destinationPath(`graphql/models/${this.answers.model}.js`),
      this.answers,
    );
    this.fs.copyTpl(
      this.templatePath('graphql/resolvers/resolver.js'),
      this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`),
      this.answers,
    );
    this.fs.copyTpl(
      this.templatePath('graphql/typeDefs/types.js'),
      this.destinationPath(`graphql/typeDefs/${this.answers.small_models}.js`),
      this.answers,
    );


    var resolversFile = this.fs.read(this.destinationPath('graphql/resolvers/index.js'));
    var resolverTop = '//top for generation';
    var resolverTopNew = `//top for generation\nconst ${this.answers.small_models} = require('./${this.answers.small_models}');`
    var resolverQ = 'Query: {';
    var resolverQNew = `Query: {\n\t\t...${this.answers.small_models}.Query,`;
    var resolverM = 'Mutation: {';
    var resolverMNew = `Mutation: {\n\t\t...${this.answers.small_models}.Mutation,`;
    resolversFile = resolversFile.toString().replace( new RegExp(resolverTop, 'g'), resolverTopNew );
    resolversFile = resolversFile.toString().replace( new RegExp(resolverQ, 'g'), resolverQNew);
    resolversFile = resolversFile.toString().replace( new RegExp(resolverM, 'g'), resolverMNew);
    this.fs.write(this.destinationPath('graphql/resolvers/index.js'), resolversFile);


    var typeFile = this.fs.read(this.destinationPath('graphql/typeDefs/index.js'));
    var typeTop = '//top for generation';
    var typeTopNew = `//top for generation\nconst ${this.answers.small_models} = require('./${this.answers.small_models}');`
    var typeGql = 'helpers.Type}';
    var typeGqlNew1 = `helpers.Type}\n\t\${${this.answers.small_models}.Type}`;
    var typeGqlNew2 = `helpers.Type}\n\t\${${this.answers.small_models}.Input}`;
    var typeQ = 'type Query {';
    var typeQNew = `type Query {\n\t\t\${${this.answers.small_models}.Query}`;
    var typeM = 'type Mutation {';
    var typeMNew = `type Mutation {\n\t\t\${${this.answers.small_models}.Mutation}`;
    typeFile = typeFile.toString().replace( new RegExp(typeTop, 'g'), typeTopNew );
    typeFile = typeFile.toString().replace( new RegExp(typeGql, 'g'), typeGqlNew1);
    typeFile = typeFile.toString().replace( new RegExp(typeGql, 'g'), typeGqlNew2);
    typeFile = typeFile.toString().replace( new RegExp(typeQ, 'g'), typeQNew);
    typeFile = typeFile.toString().replace( new RegExp(typeM, 'g'), typeMNew);
    this.fs.write(this.destinationPath('graphql/typeDefs/index.js'), typeFile);

  }

  install() {
    //this.installDependencies();
  }
};
