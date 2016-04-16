class CommentsController < ApplicationController
	  #before_action :set_post, only: [:show, :edit, :update, :destroy]
	  #before_action :authenticate_user!, except: [:index, :show]
	  #before_action :authorized_user, only: [:edit, :update, :destroy]
	  
	def create
		@post = Post.find(params[:post_id])
		@comment = @post.comments.create(params[:comment].permit(:comment))
		#@comment = Comment.new(:parent_id => params[:parent_id])
		#:parent_id => params[:parent_id]
		@comment.user_id = current_user.id if current_user
		@comment.save
		#@user_name = @comment.user.username
		@user_name = User.find(@comment.user_id)
		if @comment.save
			redirect_to :back
		else
			render 'new'
		end
	end
	
	def new
		@comment = Comment.new(:parent_id => params[:parent_id])
	end	

	def edit
		@post = Post.find(params[:post_id])
		@comment = @post.comments.find(params[:id])
	end

	def update
		@post = Post.find(params[:post_id])
		@comment = @post.comments.find(params[:id])

		if @comment.update(params[:comment].permit(:comment))
			#redirect_to post_path(@post)
			redirect_to :back
		else
			render 'edit'
		end
	end

	def destroy
		@post = Post.find(params[:post_id])
		@comment = @post.comments.find(params[:id])
		@comment.destroy
		#redirect_to post_path(@post)
		redirect_to :back
	end
end