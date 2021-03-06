Rails.application.routes.draw do


  get 'trends/index'

  get 'trends/show'

  namespace :api, defaults: {format: 'json'} do
      get '/recent' => 'api/pages#recent'
  end

  #############################################################################
  mount Starburst::Engine => "/starburst"
  #root 'pages#index'
  resources :posts

  devise_for :users, controllers: {omniauth_callbacks: "omniauth_callbacks"}
  #resources :tags
  resources :users do
    #resources :invites
    member do
      get :following, :followers
    end
  end
  resources :relationships
  get "sitemap" => "pages#sitemap"

  # Define root URL
  root 'pages#index'

  # Define roots for pages
  get '/home' => 'pages#home'
  get '/settings' => 'pages#settings'
  get '/user/:id' => 'pages#profile'
  get 'user/profile' => 'pages#profile'
  #get '/invite/:code' => 'pages#invited'
  get '/notifications' => 'pages#notifications'
  get '/explore' => 'pages#explore'
  get '/reprofile' => 'pages#reprofile'
  get '/new' => 'pages#new'
  get '/notlogged' => 'pages#notlogged'
  get '/makememe' => 'pages#makememe'
  get '/make' => 'pages#newmake'
  get '/make/memes' => 'pages#memes'
  get '/make/gifs' => 'pages#gifs'
  get '/make/ragecomics' => 'pages#ragecomics'
  get '/make2' => 'pages#make2'
  get '/delete' => 'pages#delete'
  get '/signup2' => 'pages#signup2'
  get '/checkUsername' => 'pages#checkUsername'
  get '/acceptUser' => 'pages#acceptUser'
  get '/signup' => 'pages#signup'
  get '/checkEmail' => 'pages#checkEmail'
  get '/follow' => 'trends#follow'
  get '/pages/loadPost' => 'pages#loadPost'
  get '/pages/feedback' => 'pages#feedback'
  get '/pages/renderTrends' => 'pages#renderTrends'
  get '/pages/stock' => 'pages#stock'
  get '/pages/deleteStock' => 'pages#deleteStock'
  get '/about' => 'pages#about'
  get '/terms' => 'pages#terms'
  get '/contact' => 'pages#contact'
  get '/recent' => 'pages#recent'
  get '/enter' => 'pages#enter'
  get '/new-posts' => 'pages#newposts'
  get '/register' => 'pages#register'
  get '/admin' => 'pages#admin'
  get '/tags' => 'tags#index'
  #get '/trends' => 'tags#trends'
  get '/trends' => 'trends#index'
  get '/tags/:name' => 'tags#tag'
  #get '/trends/:name' => 'tags#trend'
  get '/trends/:name' => 'trends#trend'
  get '/invite/:id' => 'invites#show'
  get '/pages/followTags' => 'pages#followTags'
  ##get 'tags/:tag', to: 'articles#index', as: :tag
  resources :activities
  resources :comments
  #resources :tags, only: [:index, :show]
  resources :posts do

    resources :comments do
      member do
        put "like", to: "comments#upvote"  # maybe change it to POSTS??
        put "dislike", to: "comments#downvote" # maybe change it to POSTS??
      end
      resources :replies do
        member do
          put "like", to: "replies#upvote"  # maybe change it to POSTS??
          put "dislike", to: "replies#downvote" # maybe change it to POSTS??
        end
      end
    end
    member do
      put "like", to: "posts#upvote"  # maybe change it to POSTS??
      put "dislike", to: "posts#downvote" # maybe change it to POSTS??
      put "report", to: "posts#report" # maybe change it to POSTS??
    end

  end
  #resources :comments
  #resources :comments, only: [:index, :new, :create]
  #get '/comments/new/(:parent_id)', to: 'comments#new', as: :new_comment
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

end
