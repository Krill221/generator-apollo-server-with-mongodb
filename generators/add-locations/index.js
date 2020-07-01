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
    
    var models = this.fs.read(this.destinationPath(`models/${this.answers.model}.js`));
    var regEx1 = new RegExp('new Schema\\({', 'g');
    var regEx11 = new RegExp('module', 'g');
    models = models.toString().replace(regEx1, `new Schema({\n\t${this.answers.fields.map(f => ( `${f[0]}: {\n\t\ttype: { type: String },\n\t\tcoordinates: []\n\t}`) ).join(',\n\t')},`);
    this.answers.fields.forEach(f => {
      models = models.toString().replace(regEx11, `PlaceSchema.index({ ${f[0]}: "2dsphere" });\nmodule`);
    });
    this.fs.write(this.destinationPath(`models/${this.answers.model}.js`), models);

    var typeDefs = this.fs.read(this.destinationPath(`graphql/typeDefs.js`));
    var regEx2 = new RegExp(`type ${this.answers.model} {`, 'g');
    var regEx3 = new RegExp(`update${this.answers.model}\\(`, 'g');
    typeDefs = typeDefs.toString().replace(regEx2, `type ${this.answers.model} {\n\t\t${this.answers.fields.map(f => `${f[0]}: Location`).join('\n\t\t')}`);
    typeDefs = typeDefs.toString().replace(regEx3, `update${this.answers.model}(\n\t\t\t${this.answers.fields.map(f => `${f[0]}_lat: String,\n\t\t\t${f[0]}_lng: String`).join(',\n\t\t\t')},`);
    this.fs.write(this.destinationPath(`graphql/typeDefs.js`), typeDefs);

    var resolvers = this.fs.read(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`));
    var regEx6 = new RegExp(`async update${this.answers.model}\\(_, { `, 'g');
    resolvers = resolvers.toString().replace(regEx6, `async update${this.answers.model}(_, { ${this.answers.fields.map(f => `${f[0]}_lat, ${f[0]}_lng`).join(', ')}, `);

    var regEx4 = new RegExp(`await item.save\\(\\);`, 'g');
    this.answers.fields.forEach(f => {
      resolvers = resolvers.toString().replace(regEx4, `
                if (${f[0]}_lat !== undefined && ${f[0]}_lng !== undefined) {
                  item.${f[0]} = { type: "Point", coordinates: [parseFloat(${f[0]}_lat), parseFloat(${f[0]}_lng)] }
                }
                await item.save();`);
    });
    this.fs.write(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`), resolvers);


  }

  install() {
    //this.installDependencies();
  }
};
