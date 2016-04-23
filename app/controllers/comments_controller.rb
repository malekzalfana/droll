class CommentsController < ApplicationController
  def index
    @comments = Comment.all
  end

  def new
    @comment = Comment.new
  end

  def create
=begin    
    #if params.fetch(:parent_id, nil).present?
      @post = Post.find(params[:post_id])
      #if !params[:parent_id] == nil
        @comment = @parent.replies.new(comment_params)
      #else
  		  @comment = @post.comments.new(comment_params)
        @comment.user = current_user
      #end
=end
    
    if params[:comment][:parent_id].present?
      @comment = Comment.find(params[:comment][:parent_id]).replies.new(comment_params)
      @comment.user = current_user
    elsif params[:comment][:parent_id].blank?
      @post = Post.find(params[:post_id])
      @comment = @post.comments.new(comment_params)
      @comment.user = current_user
    end
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
    params.require(:comment).permit(:body, :parent_id)
  end
  def post?
    params[:commit] == "post"
  end
  def reply?
    params[:commit] == "reply"
  end
end