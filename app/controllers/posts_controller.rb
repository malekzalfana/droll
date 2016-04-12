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
    @post = Post.new(permit_post);
    if @post.save
      flash[:success] = "Uploaded"
      redirect_to '/'
    else 
      flash[:error] = @posts_errors_full_messages
    end  
  end  
  
  private 
    def permit_post
    params.require(:post).permit(:image, :title);
    end
end
