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

  writing() {
    
    var models = this.fs.read(this.destinationPath(`graphql/models/${this.answers.model}.js`));
    var regEx1 = new RegExp('new Schema\\({', 'g');
    var regEx11 = new RegExp('module', 'g');
    models = models.toString().replace(regEx1, `new Schema({\n\t${this.answers.fields.map(f => ( `${f[0]}: {\n\t\ttype: { type: String },\n\t\tcoordinates: []\n\t}`) ).join(',\n\t')},`);
    this.answers.fields.forEach(f => {
      models = models.toString().replace(regEx11, `${this.answers.model}Schema.index({ ${f[0]}: "2dsphere" });\nmodule`);
    });
    this.fs.write(this.destinationPath(`graphql/models/${this.answers.model}.js`), models);

    var typeDefs = this.fs.read(this.destinationPath(`graphql/typeDefs/${this.answers.small_models}.js`));
    var regEx2 = `type ${this.answers.model} {`;
    var regEx3 = `input ${this.answers.model}Input {`;
    typeDefs = typeDefs.toString().replace(new RegExp(regEx2, 'g'), `type ${this.answers.model} {\n${this.answers.fields.map(f => `${f[0]}: Loc`).join('\n')}`);
    typeDefs = typeDefs.toString().replace(new RegExp(regEx3, 'g'), `input ${this.answers.model}Input {\n${this.answers.fields.map(f => `${f[0]}: Location`).join('\n')}`);
    this.fs.write(this.destinationPath(`graphql/typeDefs/${this.answers.small_models}.js`), typeDefs);

    var resolversFile = this.fs.read(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`));
    var regEx6 = new RegExp(`async update${this.answers.model}\\(_, { input: { `, 'g');
    resolversFile = resolversFile.toString().replace(regEx6, `async update${this.answers.model}(_, { input: { ${this.answers.fields.map(f => f[0] ).join(', ')}, `);
    var regEx4 = new RegExp(`await item.save\\(\\);`, 'g');
    this.answers.fields.forEach(f => {
      resolversFile = resolversFile.toString().replace(regEx4, `Helper.location(item, '${f[0]}', ${f[0]}, context);
                await item.save();`);
    });
    this.fs.write(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`), resolversFile);

  }

  install() {
    //this.installDependencies();
  }
};
