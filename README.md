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
yo generator-apollo-server-with-mongodb
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
#### To add new fields to model type in console:
```
yarn add-fields Post body:String img:String
```
#### To delete fields from model type in console:
```
yarn delete-fields Post body:String img:String
```
#### To add new has-one relation field to model type in console:
```
yarn add-has-one Post Comment name:String desc:String
```
#### To delete has-one relation field from model type in console:
```
yarn delete-has-one Post Comment
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
yarn add-estimates Post like:Float stars:Float
```
#### To delete estimate's array field to model type in console:
```
yarn delete-estimates Post like:Float stars:Float
```
#### To add location fields to model type in console:
```
yarn add-locations Post location1:Location location2:Location
```
#### To delete location fields to model type in console:
```
yarn delete-locations Post location1:Location location2:Location
```
