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

    var models = this.fs.read(this.destinationPath(`graphql/models/${this.answers.model}.js`));
    var typeDefs = this.fs.read(this.destinationPath(`graphql/typeDefs/${this.answers.small_models}.js`));
    var resolvers = this.fs.read(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`));

    this.answers.fields.forEach(f => {
      var regEx1 = `\t${f[0]}: \\{\n\t\ttype: \\{ type: String \\},\n\t\tcoordinates: \\[\\]\n\t\\},\n`;
      var regEx11 = `${this.answers.model}Schema.index\\(\\{ ${f[0]}: "2dsphere" \\}\\);\n`;
      models = models.toString().replace(new RegExp(regEx11, 'g'), '');
      models = models.toString().replace(new RegExp(regEx1, 'g'), '');

      var regEx31 = `${f[0]}: Loc\n`;
      var regEx32 = `${f[0]}: Location\n`;
      typeDefs = typeDefs.toString().replace(new RegExp(regEx31, 'g'), '');
      typeDefs = typeDefs.toString().replace(new RegExp(regEx32, 'g'), '');

      var regEx41 = `if \\(${f[0]}.coordinates\\[0\\] !== undefined && ${f[0]}.coordinates\\[1\\] !== undefined\\) \\{\n`;
      var regEx42 = `\t\t\t\titem.${f[0]} = \\{ type: "Point", coordinates: \\[parseFloat\\(${f[0]}.coordinates\\[0\\]\\), parseFloat\\(${f[0]}.coordinates\\[1\\]\\)\\] \\}\n\t\t\t\t\\}`;
      var regEx51 = `${f[0]}, `;
      resolvers = resolvers.toString().replace(new RegExp(regEx41, 'g'), '');
      resolvers = resolvers.toString().replace(new RegExp(regEx42, 'g'), '');
      resolvers = resolvers.toString().replace(new RegExp(regEx51, 'g'), '');

    });
    this.fs.write(this.destinationPath(`graphql/models/${this.answers.model}.js`), models);
    this.fs.write(this.destinationPath(`graphql/typeDefs/${this.answers.small_models}.js`), typeDefs);
    this.fs.write(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`), resolvers);

  }

  install() {
    //this.installDependencies();
  }
};
