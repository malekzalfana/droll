{"filter":false,"title":"omniauth.rb","tooltip":"/config/initializers/omniauth.rb","undoManager":{"mark":1,"position":1,"stack":[[{"start":{"row":0,"column":0},"end":{"row":3,"column":3},"action":"insert","lines":["Rails.application.config.middleware.use OmniAuth::Builder do","  provider :developer unless Rails.env.production?","  provider :twitter, ENV['TWITTER_KEY'], ENV['TWITTER_SECRET']","end"],"id":1}],[{"start":{"row":1,"column":2},"end":{"row":1,"column":3},"action":"insert","lines":["#"],"id":4}],[{"start":{"row":0,"column":0},"end":{"row":3,"column":3},"action":"remove","lines":["Rails.application.config.middleware.use OmniAuth::Builder do","  #provider :developer unless Rails.env.production?","  provider :twitter, ENV['TWITTER_KEY'], ENV['TWITTER_SECRET']","end"],"id":5},{"start":{"row":0,"column":0},"end":{"row":2,"column":3},"action":"insert","lines":["Rails.application.config.middleware.use OmniAuth::Builder do","  provider :twitter, 'TWITTER_KEY', 'TWITTER_SECRET'","end"]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":3,"column":3},"end":{"row":3,"column":3},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1473720601268,"hash":"ae3f00f4c4c54a0ffdc95314ad2fa3bdb959f85d"}