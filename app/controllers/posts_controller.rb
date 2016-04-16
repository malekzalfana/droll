class PostsController < ApplicationController
  
  impressionist actions: [:show], unique: [:session_hash]
  #is_impressionable :counter_cache => true, :column_name => :my_column_name, :unique => true
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
    #@user = User.find(params[:user_id])
    @post = current_user.posts.build(permit_post)
    if @post.save
      flash[:success] = "Uploaded"
      redirect_to '/'
    else 
      flash[:error] = @posts_errors_full_messages
    end  
  end  
  
  def upvote
    @post = Post.find(params[:id])
      if current_user.voted_up_on? @post
        @post.unvote_by current_user
      else
        @post.upvote_by current_user
      end
  end
  
  def downvote
    @post = Post.find(params[:id])
      if current_user.voted_down_on? @post
        @post.unvote_by current_user
      else
        @post.downvote_by current_user
      end
  end
  
  private 
    def permit_post
    params.require(:post).permit(:image, :title);
    end
end