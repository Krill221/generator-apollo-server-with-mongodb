# 1. SHOP
yarn add-model Product name:String pic:String desc:String price:String
yarn add-model Order address:String
yarn add-model OrderItem value:String
yarn add-has-many Order OrderItem
yarn add-has-many Product OrderItem


