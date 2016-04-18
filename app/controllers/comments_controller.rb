class CommentsController < ApplicationController
  def index
    @comments = Comment.all
  end

  def new
  end

  def create
    @post = Post.find(params[:post_id])
		@comment = @post.comments.create(comment_params)
    #@comment = Comment.new(comment_params)

  if @comment.save
    flash[:success] = 'Your comment was successfully added!'
    redirect_to root_url
  else
    render 'new'
  end
  end

  private

  def comment_params
    params.require(:comment).permit(:title, :body)
  end
end