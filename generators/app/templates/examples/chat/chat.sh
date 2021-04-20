# 1. TEXT CHAT (with chat rooms and messages)
yarn add-model Chat name:String
yarn add-model Message text:String
yarn add-has-many Chat Message
yarn add-has-many User Message

# 2. LIKES (add to model)
yarn add-model Like value:String
yarn add-has-many User Like
yarn add-has-estime Message Like

# 3. Copy pages to /src/pages

# add to Menu.js
# chats