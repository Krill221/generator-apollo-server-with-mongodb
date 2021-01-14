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
      this.templatePath('models/model.js'),
      this.destinationPath(`models/${this.answers.model}.js`),
      this.answers,
    );
    this.fs.copyTpl(
      this.templatePath('graphql/resolvers/resolver.js'),
      this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`),
      this.answers,
    );

    
    var index = this.fs.read(this.destinationPath('graphql/resolvers/index.js'));
    var regExReq = new RegExp('//top for generation', 'g');
    var regExQ = new RegExp('Query: {', 'g');
    var regExM = new RegExp('Mutation: {', 'g');
    index = index.toString().replace(regExReq,
      `//top for generation\nconst ${this.answers.small_models}Resolvers = require('./${this.answers.small_models}');`);
    index = index.toString().replace(regExQ, `Query: {\n\t\t...${this.answers.small_models}Resolvers.Query,`);
    index = index.toString().replace(regExM, `Mutation: {\n\t\t...${this.answers.small_models}Resolvers.Mutation,`);
    this.fs.write(this.destinationPath('graphql/resolvers/index.js'), index);


    var typeDefs = this.fs.read(this.destinationPath('graphql/typeDefs.js'));
    var regExType = new RegExp('module.exports = gql`', 'g');
    var regExDQ = new RegExp('type Query {', 'g');
    var regExDM = new RegExp('type Mutation {', 'g');

    var typeDefs = typeDefs.toString().replace(regExType,
      `module.exports = gql\`\n\ttype ${this.answers.model} {\n\t\t${this.answers.fields.map(i => `${i[0]}: ${i[1]}`).join('\n\t\t')}\n\n\t\tid: ID!\n\t\tcreatedAt: String\n\t\tupdatedAt: String\n\t}`);

    typeDefs = typeDefs.toString().replace(regExDQ,
      `type Query {\n\t\t${this.answers.model}s: [${this.answers.model}]`);

    typeDefs = typeDefs.toString().replace(regExDQ,
        `type Query {\n\t\t${this.answers.model}sWhere(ids: [ID]): [${this.answers.model}]`);
    typeDefs = typeDefs.toString().replace(regExDQ,
        `type Query {\n\t\t${this.answers.model}sWhereLocation(location_name: String, lat: String, lng: String, distance: String): [${this.answers.model}]`);
      
    typeDefs = typeDefs.toString().replace(regExDM,
      `type Mutation {\n\t\tdelete${this.answers.model}(id: ID!): String!\n\t\tupdate${this.answers.model}(\n\t\t\t${this.answers.fields.map(i => `${i[0]}: ${i[1]},`).join('\n\t\t\t')}\n\t\t\tid: ID\n\t\t): ${this.answers.model}!\n`);

    this.fs.write(this.destinationPath('graphql/typeDefs.js'), typeDefs);

  }

  install() {
    //this.installDependencies();
  }
};
