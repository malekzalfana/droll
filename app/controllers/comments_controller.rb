class CommentsController < ApplicationController
  skip_before_filter  :verify_authenticity_token
  def index
    @comments = Comment.all
  end
  
  def show 
    @post = Post.find(params[:post_id])
    @comment = @post.comments.order("created_at DESC").page(params[:page]).per_page(35)
    @thiscomment = Comment.find_by_id(params[:id])
  end 
  
  def new
    @comment = Comment.new
    @post = Post.find(params[:post_id])
    
  end

  def create
    
    if params[:comment][:parent_id].present?
      @comment = Comment.find(params[:comment][:parent_id]).replies.build(comment_params)
      #@comment = @post.comments.create(comment_params)
      @comment.user = current_user
      @comment_parent = Comment.find(params[:comment][:parent_id]).user
      @post = Post.find_by_id(params[:comment][:post_id])
      puts 'ffffffffffffffffffffffffffffff'
      puts @post
      puts 'ffffffffffffffffffffffffffffffddddd'
      @comment.postid = @post.id
    elsif params[:comment][:parent_id].blank?
    @post = Post.find(params[:post_id])
      @comment = @post.comments.create(comment_params)
      @comment.user = current_user
      if @comment.user != @comment.post.user
        @comment.create_activity :create, owner: current_user, key: 'commenting', recipient: @comment.post.user
      end
    end
    
        
        @comment.save
        @comment.body.scan(/@(\w+)/).flatten.to_a.each do|username|
        @mentioned = User.find_by_username(username)
        if !@mentioned.blank?
          @comment.body = username
          @comment.save
          @comment_body = @comment.body
          @comment2 = @comment
          @comment2.create_activity :create, recipient: @mentioned, key: 'mentioning'
          puts @comment_body
          mentioned_id = @mentioned.id
          mentioned_username = @mentioned.username
          @comment.body.gsub!(username, '<span class="mentioned link" data-url="/user/'+ mentioned_username.to_s  + '">@' + mentioned_username.to_s + '</span>')
          @comment.save
          puts @comment_body
        end  
      end
      
      unless !params[:base64].present?
        puts "base64 existssssssssssssssssssssssssssssssss"
        data =  params[:base64]
        #File.open("#{Rails.root}/public/#{@post.image.url.to_s}", 'wb') do |f|
        #  f.write image_data
        #end
        #image = Base64.decode64(data['data:image/png;base64,'.length .. -1])
        #new_file=File.new("image.png", 'wb')
        #new_file.write(image)
        image = Paperclip.io_adapters.for(data) 
        image.original_filename = "image.png"
        #@post.update!(image: new_file)
        @comment.image = image
        @comment.save
      end
      
      if @comment.save
      respond_to do |format|
         #format.html
         format.js
      end
      
    end
    
  end
  
  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    if @comment.destroy
      PublicActivity::Activity.where(key: 'upvoting', trackable_id: @comment.id, owner: current_user).destroy_all
      if !params[:post][:user_id].blank?
        @comment.user.create_activity :create, key: 'drolling', recipient: @comment.user, parameters: {url: url_for(@comment), what: "Your comment got removed due to user feedback"}
      end
      redirect_to :back
    end
  end
  
  def upvote
    @comment = Comment.find(params[:id])
    if @comment.postid.nil?
      @post = @comment.post
    else
      @post = Post.find(@comment.postid)
    end
    if params.has_key?(:favor)
      @comment.vote_by :voter => current_user, :vote_scope => 'favor'
      puts 'faaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    else  
      if current_user.voted_up_on? @comment
        @comment.unvote_by current_user
        PublicActivity::Activity.where(key: 'upvoting', trackable_id: @comment.id, owner: current_user).destroy_all
        if @comment.get_upvotes.size > 0
          @lastvoter = User.where(@comment.votes_for.up.ids.include? :id).last
          @comment.create_activity :upvote, owner: @lastvoter, key: 'upvoting', recipient: @comment.user
        end
      else
        @comment.upvote_by current_user
        if current_user != @comment.user
          PublicActivity::Activity.where(key: 'upvoting', trackable_id: @comment.id).destroy_all
          if @post.anonymous ===  true && @post.user == current_user
            @comment.create_activity :upvote, owner: current_user, parameters: {anonymous: true}, key: 'upvoting', recipient: @comment.user
          else 
            @comment.create_activity :upvote, owner: current_user, key: 'upvoting', recipient: @comment.user
          end
          puts 'upvoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooote'
          redirect_to :back
        end
      end
      if current_user == @comment.user
        @comment.upvote_by current_user
        redirect_to '/'
      end
    end  
  end
  
  def downvote
    @comment = Comment.find(params[:id])
      if current_user.voted_down_on? @comment
        @comment.unvote_by current_user
      else
        @comment.downvote_by current_user
        if (@comment.created_at > Time.now - 7.minutes) && @comment.get_downvotes.size == 2
          @comment.hidden = true
          @comment.update_attributes(permit_post2)
          Rails.logger.info(@comment.errors.messages.inspect)
          @comment.user.create_activity :create, key: 'drolling', recipient: @comment.user, parameters: {url: url_for(@comment), what: 'Your comment got removed due to user voting.'}
        elsif ( ( 100 * @comment.get_downvotes.size ) / @comment.get_upvotes.size) > 25
          @comment.hidden = true
          @comment.update_attributes(permit_post2)
          Rails.logger.info(@comment.errors.messages.inspect)
          @comment.user.create_activity :create, key: 'drolling', recipient: @comment.user, parameters: {url: url_for(@comment), what: "Your comment got removed due to user voting."}
        end
        redirect_to :back
      end
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :parent_id, :image)
  end
  def post?
    params[:commit] == "post"
  end
  def reply?
    params[:commit] == "reply"
  end
end