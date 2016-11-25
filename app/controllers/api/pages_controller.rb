module Api
    class 
      PagesController < ApplicationController  # APIIIIIIII
          class Post < ::Post
          end
      
      respond_to :json
      
      def index
        if user_signed_in?
          @popularPosts = Post.where(hidden: nil).where('cached_votes_up > 2')
          @followingPosts = Post.where(hidden: nil).where(:user_id => current_user.following)
          @post2 = [@popularPosts,@followingPosts].flatten
          @post = @post2.sort_by{|e| e[:time_ago]}.paginate(:per_page => 10, :page => params[:page])
          respond_with @post
        else
          @post = Post.where(hidden: nil).order("created_at DESC").paginate(:per_page => 10, :page => params[:page])
          respond_with @post
        end
      end
      
      
      def recent
        @post = Post.where(hidden: nil).order("created_at DESC").page(params[:page]).per_page(10)
        
      end
  
  
    end
end
