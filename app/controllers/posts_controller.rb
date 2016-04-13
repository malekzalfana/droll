class PostsController < ApplicationController
  #resources posts
  
  def new
    @post = current_user.posts.build
  end

  def index
    @post = Post.all
  end

  def show
    @post = Post.find(params[:id])
  end
  
  def create
    #@post = Post.new(permit_post);
    #@post = current_user.posts.build(params[:post])
    #@post = Post.find(params[:id])
    @user = User.find(session[:user_id])
    @post = current_user.posts.build(permit_post)
    if @post.save
      flash[:success] = "Uploaded"
      redirect_to '/'
    else 
      flash[:error] = @posts_errors_full_messages
    end  
  end  
  
  def upvote
    # current_user = User.find_by_id(session[:user_id]) -- since you use devise, you don't need this
    @post = Post.find(params[:id])
    @post.upvote_by current_user
    #@post.downvote_from current_user
    redirect_to :back
  end
  
  def downvote
  @post = Post.find(params[:id])
  @post.downvote_by current_user
  #@post.downvote_from current_user
  redirect_to :back
  end
  
  private 
    def permit_post
    params.require(:post).permit(:image, :title);
    end
end