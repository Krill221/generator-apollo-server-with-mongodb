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
    this.log("delete fields", this.answers.fields);
  }

  async prompting() {
  }

  writing() {
    
    var text = this.fs.read(this.destinationPath(`models/${this.answers.model}.js`));
    var text2 = this.fs.read(this.destinationPath(`graphql/typeDefs.js`));
    var text3 = this.fs.read(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`));
    this.answers.fields.forEach(f => {
      let regEx1 = new RegExp(`\t${f[0]}: ${f[1]},\n`, 'g');
      let regEx1ID = new RegExp(`\t${f[0]}: \\{type: Schema.Types.ObjectId, ref: 'Object'\\},\n`, 'g');
      text = text.toString().replace(regEx1, '');
      text = text.toString().replace(regEx1ID, '');

      let regEx2 = new RegExp(`type ${this.answers.model} \\{[\\S\\s]*?\\}`, 'g');
      text2 = text2.toString().replace(regEx2, (substr) => {
        let regEx = new RegExp(`\t\t${f[0]}: ${f[1]}\n`, 'g');
        substr = substr.replace(regEx, '');
        return substr;
      });

      let regEx3 = new RegExp(`update${this.answers.model}\\([\\S\\s]*?\\)`, 'g');
      text2 = text2.toString().replace(regEx3, (substr) => {
        let regEx = new RegExp(`\t\t\t${f[0]}: ${f[1]},\n`, 'g');
        substr = substr.replace(regEx, '');
        return substr;
      });

      let regEx4 = new RegExp(`\t\t\t\t\tif \\(${f[0]} !== undefined\\) item.${f[0]} = ${f[0]};\n`, 'g');
      let regEx5 = new RegExp(`\t\t\t\t\t\t${f[0]},\n`, 'g');
      let regEx6 = new RegExp(`${f[0]}, `, 'g');
      text3 = text3.toString().replace(regEx4, '');
      text3 = text3.toString().replace(regEx5, '');
      text3 = text3.toString().replace(regEx6, '');
      
    });
    this.fs.write(this.destinationPath(`models/${this.answers.model}.js`), text);
    this.fs.write(this.destinationPath(`graphql/typeDefs.js`), text2);
    this.fs.write(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`), text3);

  }

  install() {
    //this.installDependencies();
  }
};
