var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name:",
        default: this.appname.replace(' ', '-')
      },
      {
        type: "input",
        name: "projectAuthor",
        message: "Author names:",
        default: 'krill221'
      },
      {
        type: "input",
        name: "port",
        message: "On which port to run the app:",
        default: 4000
      },
      {
        type: "input",
        name: "mongodb",
        message: "Mongodb address:",
        default: ''
      },
      {
        type: "input",
        name: "sekret_key",
        message: "Sekret_key:",
        default: ''
      },
      {
        type: "input",
        name: "aws_s3_key",
        message: "AWS_S3 Key:",
        default: ''
      },
      {
        type: "input",
        name: "aws_s3_sekret",
        message: "AWS_S3 Secret:",
        default: ''
      },
      {
        type: "input",
        name: "aws_s3_bucket",
        message: "AWS_S3 Bucket:",
        default: ''
      },
      {
        type: "input",
        name: "aws_s3_upload_folder",
        message: "AWS_S3 Upload Folder:",
        default: this.appname.replace(' ', '-')
      },
      {
        type: "input",
        name: "smtp_server",
        message: "smtp_server:",
        default: ''
      },
      {
        type: "input",
        name: "smtp_domain",
        message: "smtp_domain:",
        default: ''
      },
      {
        type: "input",
        name: "smtp_server_auth",
        message: "smtp_server_auth:",
        default: ''
      },
      {
        type: "input",
        name: "smtp_domain_auth",
        message: "smtp_domain_auth:",
        default: ''
      },
      {
        type: "input",
        name: "smtp_port",
        message: "smtp_port:",
        default: ''
      },
      {
        type: "input",
        name: "smtp_port_secure",
        message: "smtp_port_secure:",
        default: ''
      },
      {
        type: "input",
        name: "smtp_user",
        message: "smtp_user:",
        default: ''
      },
      {
        type: "input",
        name: "smtp_pass",
        message: "smtp_pass:",
        default: ''
      },
      {
        type: "confirm",
        name: "confirmed",
        message: "Would you like to create the new service?"
      }
    ]);

    this.log("app name", this.answers.name);
    this.log("running on port: ", this.answers.port);
    this.log("mongodb: ", this.answers.mongodb);
  }

  writing() {
    this.fs.copyTpl(
      `${this.templatePath()}/**/!(_)`,
      this.destinationPath('./'),
      this.answers,
    );
    this.fs.copyTpl(
      `${this.templatePath()}/**/.*`,
      this.destinationPath('./'),
      this.answers,
    );
    this.log(`App created in ${this.destinationPath()}`)
  }

  install() {
    this.npmInstall()
  }
};