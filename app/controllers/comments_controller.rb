class CommentsController < ApplicationController
  skip_before_filter  :verify_authenticity_token
  def index
    @comments = Comment.all
  end

  def new
    @comment = Comment.new
  end

  def create
    if params[:comment][:parent_id].present?
      @comment = Comment.find(params[:comment][:parent_id]).replies.new(comment_params)
      @comment_parent = Comment.find(params[:comment][:parent_id]).user
      @comment.user = current_user
    elsif params[:comment][:parent_id].blank?
      @post = Post.find(params[:post_id])
      @comment = @post.comments.new(comment_params)
      @comment.user = current_user
    end
    if @comment.save
      respond_to do |format|
        format.html do
          flash[:success] = 'Comment posted.'
          #redirect_to @comment         # i commented out this
        end
        format.js # JavaScript response
      end
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
    params.require(:comment).permit(:body, :parent_id)
  end
  def post?
    params[:commit] == "post"
  end
  def reply?
    params[:commit] == "reply"
  end
end