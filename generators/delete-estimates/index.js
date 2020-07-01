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

    var text = this.fs.read(this.destinationPath(`models/${this.answers.model}.js`));
    var text2 = this.fs.read(this.destinationPath(`graphql/typeDefs.js`));
    var text3 = this.fs.read(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`));

    this.answers.fields.forEach(f => {
      var regEx1 = new RegExp(`\t${f[0]}: \\[\\{\n\t\towner: \\{type: Schema.Types.ObjectId, ref: 'Object'\\},\n\t\tvalue: Number,\n\t\\}\\],\n`, 'g');
      text = text.toString().replace(regEx1, '');

      let regEx2 = new RegExp(`type ${this.answers.model} \\{[\\S\\s]*?\\}`, 'g');
      text2 = text2.toString().replace(regEx2, (substr) => {
        var regEx2 = new RegExp(`\t\t${f[0]}: \\[Estimate\\]\n`, 'g');
        substr = substr.toString().replace(regEx2, '');
        return substr;
      });

      let regEx3 = new RegExp(`update${this.answers.model}\\([\\S\\s]*?\\)`, 'g');
      text2 = text2.toString().replace(regEx3, (substr) => {
        var regEx3 = new RegExp(`\t\t\t${f[0]}: Float,\n`, 'g');
        substr = substr.toString().replace(regEx3, '');
        return substr;
      });

      var regEx4 = new RegExp(`
                if \\(${f[0]} !== undefined\\)\\{
                  const u = checkAuth(context);
                  if\\(item.${f[0]}.filter\\(i => i.owner == u.id\\).length !== 0 \\)\\{
                    if\\(item.${f[0]}.find\\(i => i.owner == u.id\\).value == ${f[0]}\\)
                      item.${f[0]} = item.${f[0]}.filter\\(\\(i\\) => i.owner != u.id\\);
                    else\\{
                      let index = item.${f[0]}.findIndex\\( i => i.owner == u.id\\);
                      item.${f[0]}\\[index\\].value = ${f[0]};
                    \\}
                  \\} else \\{
                    const newEst = new Estimate\\(\\{owner: u.id, value: ${f[0]}\\}\\);
                    item.${f[0]} = item.${f[0]}.concat\\(newEst\\);
                  \\}
                \\}
                `);
      text3 = text3.toString().replace(regEx4, '');

      var regEx5 = new RegExp(`${f[0]}, `, 'g');
      text3 = text3.toString().replace(regEx5, '');

    });
    this.fs.write(this.destinationPath(`models/${this.answers.model}.js`), text);
    this.fs.write(this.destinationPath(`graphql/typeDefs.js`), text2);
    this.fs.write(this.destinationPath(`graphql/resolvers/${this.answers.small_models}.js`), text3);

  }

  install() {
    //this.installDependencies();
  }
};
