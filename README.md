## This is Yeoman generator for fast creation graphql server with:
- Apollo Server
- mongoose
- mongodb

### It generates full server with authorization 
### It is fully compatible with this web-app:
```
npm i generator-web-app-with-graphql
```
[https://github.com/Krill221/generator-web-app-with-graphql](https://github.com/Krill221/generator-web-app-with-graphql)


## Get started:
#### To generate server type in console:
```
npm install -g npm
npm install -g yo
npm install -g  generator-apollo-server-with-mongodb
yo apollo-server-with-mongodb
```
#### than follow instructions
#### To start local server simply type:
```
yarn s
```

## It also has simple generators:
#### To add new model (for example for model "Post") simply type in console:
```
yarn add-model Post name:String desc:String
```
#### To delete model type in console:
```
yarn delete-model Post
```
#### To add new fields to model type in console:
```
yarn add-fields Post body:String img:String
```
#### To delete fields from model type in console:
```
yarn delete-fields Post body:String img:String
```
#### To add new has-many relation field to model type in console:
```
yarn add-has-many Post Comment
```
#### To delete has-many relation field to model type in console:
```
yarn delete-has-many Post Comment
```
#### To add estimate's array field to model type in console:
```
yarn add-has-estime Post Like
```
#### To delete estimate's array field to model type in console:
```
yarn delete-has-estime Post Like
```

