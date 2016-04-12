class PagesController < ApplicationController
  def index
    @post = Post.all
  end

  def home
  end

  def profile
    if (User.find_by_username(params[:id]))
      @username = params[:id]
    else 
      redirect_to root_path, :notice => "User not found"
    end  
    @post = Post.all.where("user_id = ?", User.find_by_username(params[:id]).id )
    #@user = User.find(params[:id])
    #@username = params[:id]
    #@post = @username.Post
    #@user = User.find_by_username(params[:id])
    #@post = @user.posts
    #@post = Post.where(:user_id => current_user.id)
    #@post = @user.posts
    #@post = Post.find(:all, :conditions => {:user_id => User.find_by_username(params[:id]).id })
  end

  def explore
  end
end
