#yarn add-model Post name:String desc:String
#yarn add-fields Post body:String img:String
#yarn delete-fields Post body:String img:String
#yarn add-has-one Post Comment name:String desc:String
#yarn delete-has-one Post Comment
#yarn add-has-many Post Comment
#yarn delete-has-many Post Comment
#yarn add-estimates Post like:Float stars:Float
#yarn delete-estimates Post like:Float stars:Float
#yarn add-locations Post location1:Location location2:Location
#yarn delete-locations Post location1:Location location2:Location