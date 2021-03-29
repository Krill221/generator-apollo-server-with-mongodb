#yarn add-model Post name:String desc:String
#yarn add-fields Post body:String img:String
#yarn delete-fields Post body:String img:String
#yarn add-has-many Post Comment
#yarn delete-has-many Post Comment
#yarn add-estimates Post like:Float stars:Float
#yarn delete-estimates Post like:Float stars:Float


# Simple text chat (with chat rooms and messages)
#yarn add-model Room name:String
#yarn add-model Message text:String
#yarn add-has-many Room Message
