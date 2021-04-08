#yarn add-model Post name:String desc:String
#yarn add-fields Post body:String img:String
#yarn delete-fields Post body:String img:String
#yarn add-has-many Post Comment
#yarn delete-has-many Post Comment
#yarn add-has-estime Post Like
#yarn delete-has-estime Post Like

# 1. TEXT CHAT (with chat rooms and messages)
#yarn add-model Chat name:String
#yarn add-model Message text:String
#yarn add-has-many Chat Message
#yarn add-has-many User Message

# 2. LIKES (add to model)
#yarn add-model Like value:String userId:ID
#yarn add-has-estime Room Like