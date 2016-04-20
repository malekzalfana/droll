class PagesController < ApplicationController
  def index
    @post = Post.all
    #@post = Post.find(params[:id])
    #@comment = Comment.new
    #@comment = @post.comments.build
    
  end

  def home
  end

  def profile
    if (User.find_by_username(params[:id]))
      @username = params[:id]
      @user = User.find_by_username(params[:id])
    else 
      redirect_to root_path, :notice => "User not found"
    end  
    @post = Post.all.where("user_id = ?", User.find_by_username(params[:id]).id )
  end

  def explore
  end
end
