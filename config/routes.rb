Rails.application.routes.draw do
  #root 'pages#index'
  resources :posts

  devise_for :users
  
  resources :users do
    member do
      get :following, :followers
    end  
  end
  resources :relationships
  # Define root URL
  root 'pages#index'
  
  # Define roots for pages
  get '/home' => 'pages#home'

  get '/user/:id' => 'pages#profile'

  get '/explore' => 'pages#explore'
  resources :comments
  resources :posts do
    resources :comments#, :only => [:create, :destroy]
    member do
      put "like", to: "posts#upvote"  # maybe change it to POSTS??
      put "dislike", to: "posts#downvote" # maybe change it to POSTS??
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
