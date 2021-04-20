# 1. WEB STORE
yarn add-model Product name:String pic:String desc:String price:String
yarn add-model Order address:String
yarn add-model OrderItem value:String

yarn add-has-many Product OrderItem
yarn add-has-estime Order OrderItem
yarn add-has-many User OrderItem
yarn add-has-many User Order

# 3. Copy pages to /src/pages

#add to App.js
#<PublicMainLayout path="/catalog" component={Catalog} /> 
#<PrivateMainLayout path="/delivery" component={Delivery} /> 

# add to Menu.js
# catalog
# delivery
