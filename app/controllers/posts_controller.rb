class PostsController < ApplicationController
  def new
    @post = Post.new
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
    @post = current_user.posts.new(permit_post)
    if @post.save
      flash[:success] = "Uploaded"
      redirect_to '/'
    else 
      flash[:error] = @posts_errors_full_messages
    end  
  end  
  
  def upvote
    @post = Post.find(params[:id])
    @post.upvote_by current_user
    redirect_to :back
  end
  
  def downvote
  @post = Post.find(params[:id])
  @post.downvote_by current_user
  redirect_to :back
  end
  
  private 
    def permit_post
    params.require(:post).permit(:image, :title);
    end
end