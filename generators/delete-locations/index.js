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
    var typeDefs = this.fs.read(this.destinationPath(`graphql/typeDefs.js`));
    var resolvers = this.fs.read(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`));

    this.answers.fields.forEach(f => {
      var regEx1 = new RegExp(`\t${f[0]}: \\{\n\t\ttype: \\{ type: String \\},\n\t\tcoordinates: \\[\\]\n\t\\},\n`, 'g');
      models = models.toString().replace(regEx1, '');
      var regEx11 = new RegExp(`PlaceSchema.index\\(\\{ ${f[0]}: "2dsphere" \\}\\);\n`, 'g');
      models = models.toString().replace(regEx11, '');

      let regEx2 = new RegExp(`type ${this.answers.model} \\{[\\S\\s]*?\\}`, 'g');
      typeDefs = typeDefs.toString().replace(regEx2, (substr) => {
        var regEx2 = new RegExp(`\t\t${f[0]}: Location\n`, 'g');
        substr = substr.toString().replace(regEx2, '');
        return substr;
      });

      let regEx3 = new RegExp(`update${this.answers.model}\\([\\S\\s]*?\\)`, 'g');
      typeDefs = typeDefs.toString().replace(regEx3, (substr) => {
        var regEx31 = new RegExp(`\t\t\t${f[0]}_lat: String,\n`, 'g');
        var regEx32 = new RegExp(`\t\t\t${f[0]}_lng: String,\n`, 'g');
        substr = substr.toString().replace(regEx31, '');
        substr = substr.toString().replace(regEx32, '');
        return substr;
      });

      var regEx4 = new RegExp(`
                if \\(${f[0]}_lat !== undefined && ${f[0]}_lng !== undefined\\) \\{
                  item.${f[0]} = \\{ type: "Point", coordinates: \\[parseFloat\\(${f[0]}_lat\\), parseFloat\\(${f[0]}_lng\\)\\] \\}
                \\}
                `);
      resolvers = resolvers.toString().replace(regEx4, '');

      var regEx51 = new RegExp(`${f[0]}_lat, `, 'g');
      var regEx52 = new RegExp(`${f[0]}_lng, `, 'g');
      resolvers = resolvers.toString().replace(regEx51, '');
      resolvers = resolvers.toString().replace(regEx52, '');

    });
    this.fs.write(this.destinationPath(`models/${this.answers.model}.js`), models);
    this.fs.write(this.destinationPath(`graphql/typeDefs.js`), typeDefs);
    this.fs.write(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`), resolvers);

  }

  install() {
    //this.installDependencies();
  }
};
