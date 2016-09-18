class PostsController < ApplicationController
  
  impressionist :actions=>[:show,:index], unique: [:session_hash]
  #is_impressionable :counter_cache => true, :column_name => :my_column_name, :unique => true
  #resources posts
  
  def new
    @post = current_user.posts.build(params[:post])
  end

  def previous
    Post.where(["id < ?", id]).last
  end
  
  def next
    Post.where(["id > ?", id]).first
  end

  def index
    @post = Post.all.limit(20)
  end
  
  def loadPost
    @postid = params[:user][:postid]
    @post = Post.find(params[:user][:postid])
    @comment10 = @post.comments.where('cached_votes_score > -2').where('cached_votes_score < 10').ordered
    @comment9 = @post.comments.where('cached_votes_score > 9').where('cached_votes_score < 20').ordered
    @comment8 = @post.comments.where('cached_votes_score > 19').where('cached_votes_score < 40').ordered
    @comment7 = @post.comments.where('cached_votes_score > 39').where('cached_votes_score < 80').ordered
    @comment6 = @post.comments.where('cached_votes_score > 79').where('cached_votes_score < 160').ordered
    @comment5 = @post.comments.where('cached_votes_score > 159').where('cached_votes_score < 320').ordered
    @comment4 = @post.comments.where('cached_votes_score > 319').where('cached_votes_score < 640').ordered
    @comment3 = @post.comments.where('cached_votes_score > 639').where('cached_votes_score < 1280').ordered
    @comment2 = @post.comments.where('cached_votes_score > 1279').where('cached_votes_score < 2560').ordered
    @comment1 = @post.comments.where('cached_votes_score > 2559').ordered
    @commentbefore = [@comment1, @comment2,@comment3,@comment4,@comment5,@comment6,@comment7,@comment8,@comment9,@comment10].flatten
    @comment = @commentbefore.paginate(:per_page => 35, :page => 1)
    respond_to do |format|
     format.html
     format.js
    end
  end
  
  
  def show
    @post = Post.find(params[:id])
    @activities = PublicActivity::Activity.order("created_at DESC").where( recipient: current_user).limit(25).all
    #@comment = @post.comments.order("created_at DESC").page(params[:page]).per_page(35)
    #@highestVoted = Comment.order("created_at DESC").get_votes.size
    @comment10 = @post.comments.where('cached_votes_score > -2').where('cached_votes_score < 10').ordered
    @comment9 = @post.comments.where('cached_votes_score > 9').where('cached_votes_score < 20').ordered
    @comment8 = @post.comments.where('cached_votes_score > 19').where('cached_votes_score < 40').ordered
    @comment7 = @post.comments.where('cached_votes_score > 39').where('cached_votes_score < 80').ordered
    @comment6 = @post.comments.where('cached_votes_score > 79').where('cached_votes_score < 160').ordered
    @comment5 = @post.comments.where('cached_votes_score > 159').where('cached_votes_score < 320').ordered
    @comment4 = @post.comments.where('cached_votes_score > 319').where('cached_votes_score < 640').ordered
    @comment3 = @post.comments.where('cached_votes_score > 639').where('cached_votes_score < 1280').ordered
    @comment2 = @post.comments.where('cached_votes_score > 1279').where('cached_votes_score < 2560').ordered
    @comment1 = @post.comments.where('cached_votes_score > 2559').ordered
    @commentbefore = [@comment1, @comment2,@comment3,@comment4,@comment5,@comment6,@comment7,@comment8,@comment9,@comment10].flatten
    @comment = @commentbefore.paginate(:per_page => 35, :page => 1)
    respond_to do |format|
     format.html
     format.js
    end
  end
  
  def create
    @post = current_user.posts.build(permit_post)
    @post.user = current_user
    @post.user_id = current_user.id
    if !params[:base64].present?
      dimensions = Paperclip::Geometry.from_file(@post.image.queued_for_write[:medium].path)
      puts 'noooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
      puts dimensions
      puts 'noooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
      if dimensions.height > 950
        @post.long = true
      end
    end  
    unless !params[:anonymous].present?
      @post.anonymous = true
    end
    unless !params[:base64].present?
      puts "base64 existssssssssssssssssssssssssssssssss"
      data =  params[:base64]
      image = Paperclip.io_adapters.for(data) 
      image.original_filename = "image.png"
      @post.image = image
      
      if !@post.image.nil?
        @theimage =  @post.image
        dimensions = Paperclip::Geometry.from_file(@post.image.queued_for_write[:medium].path)
        puts 'noooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
        puts dimensions
        puts 'noooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
      end
      if dimensions.height > 950
        @post.long = true
      end
      @post.save
    end
    
    if @post.save
      
      redirect_to @post
      flash[:notice] = "Post uploaded"
      if !params[:anonymous].present?
        @post.create_activity :create, owner: current_user, key: 'posting'
      end
    else
      flash[:notice] = "Post wasn't uploaded"
    end
  end
  
  def upvote
    @post = Post.find(params[:id])
    if params.has_key?(:favor)
      @post.unvote_by current_user
      flash.now[:notice] = 'Favored'
      @post.unvote_by current_user, vote_scope: 'favor'
      if !current_user.voted_on? @post, vote_scope: 'favor'
        @post.vote_by :voter => current_user, :vote_scope => 'favor'
      puts 'faaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      end  
    else
      if current_user.voted_up_on? @post
        @post.unvote_by current_user
        PublicActivity::Activity.where(key: 'upvoting', trackable_id: @post.id, owner: current_user).destroy_all
        if @post.get_upvotes.size > 0
          @lastvoter = User.where(@post.votes_for.up.ids.include? :id).last
          @post.create_activity :upvote, owner: @lastvoter, key: 'upvoting', recipient: @post.user
        end
      else
        @post.upvote_by current_user
        if current_user != @post.user
          PublicActivity::Activity.where(key: 'upvoting', trackable_id: @post.id).destroy_all
          @post.create_activity :upvote, owner: current_user, key: 'upvoting', recipient: @post.user
          puts 'upvoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooote'
          #redirect_to :back
        end
      end
    end  
    redirect_to :back
  end
  
  def edit
      
  end
  
  def update
    @post = current_user.posts.find(params[:id])
    @post.user_id = current_user.id
    @post.user = current_user
=begin    
    if params[:post][:anonymous] == 1
      @post.anonymous = true
      @post.update(anonymous: true)
    else
      @post.anonymous = false
      @post.update(anonymous: false)
    end
=end    
    @post.update_attributes(permit_post)
    Rails.logger.info(@post.errors.messages.inspect)
    respond_to do |format|
     format.html
     format.js
    end
    
    #end
  end
  
  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    respond_to do |format|
     format.html
     format.js
    end
  end
  
  def report
    @post = Post.find(params[:id])
    @post.unvote_by current_user
    if !current_user.voted_on? post, vote_scope: 'report'
      @post.downvote_by :voter => current_user, :vote_scope => 'report'
    else
      @post.unvote_by current_user
    end
  end
  
  def downvote
    @post = Post.find(params[:id])
    if params.has_key?(:report)
      #@post.unvote_by current_user
      if !current_user.voted_on? @post, vote_scope: 'report'
        puts 'sM'
        @post.downvote_from current_user, :vote_scope => 'report'
        @post.downvote_from User.find_by_id(3), :vote_scope => 'report'
      else
        @post.unvote_by current_user, vote_scope: 'report'
      end
      puts 'sssssssssssssssssssssssssssssssssssssssssssss'
    else    
      if current_user.voted_down_on? @post
        @post.unvote_by current_user
        @post.create_activity :upvote, owner: current_user, key: 'upvoting'
      else
        @post.downvote_by current_user
      end
    end  
    redirect_to '/'
  end
  
  private 
    def permit_post
    params.require(:post).permit(:image, :title, :long, :anonymous, :facenumber);
    end
end