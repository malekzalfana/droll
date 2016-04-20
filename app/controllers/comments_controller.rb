class CommentsController < ApplicationController
  def index
    @comments = Comment.all
  end

#=begin
  def new
    @comment = Comment.new
  end
#=end

  def create
    @post = Post.find(params[:post_id])
		@comment = @post.comments.create(comment_params)
    @comment.user = current_user
    if @comment.save
      flash[:success] = 'Your comment was successfully added!'
      redirect_to :back
    else
      render 'new'
    end
  end
  
  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    if @comment.destroy
      redirect_to :back
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end