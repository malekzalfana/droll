Rails.application.routes.draw do
  #get 'tags/index'

  #get 'tags/show'

  #get 'activities/index'
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
  
  # Define root URL
  root 'pages#index'
  
  # Define roots for pages
  get '/home' => 'pages#home'
  get '/settings' => 'pages#settings'
  get '/user/:id' => 'pages#profile'
  #get '/invite/:code' => 'pages#invited'

  get '/explore' => 'pages#explore'
  get '/make' => 'pages#make'
  get '/make2' => 'pages#make2'
  get '/delete' => 'pages#delete'
  get '/checkUsername' => 'pages#checkUsername'
  get '/signup' => 'pages#signup'
  get '/checkEmail' => 'pages#checkEmail'
  get '/pages/loadPost' => 'pages#loadPost'
  get '/pages/feedback' => 'pages#feedback'
  get '/pages/stock' => 'pages#stock'
  get '/pages/deleteStock' => 'pages#deleteStock'
  get '/about' => 'pages#about'
  get '/terms' => 'pages#terms'
  get '/contact' => 'pages#contact'
  get '/recent' => 'pages#recent'
  get '/register' => 'pages#register'
  get '/admin' => 'pages#admin'
  get '/tags' => 'tags#index'
  get '/tags/:name' => 'tags#tag'
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
