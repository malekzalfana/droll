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
    if params[:commentid].present?
      @commentid = params[:commentid]
    else
      @commentid = '0'
    end
    @activities = PublicActivity::Activity.order("created_at DESC").where( recipient: current_user).limit(25).all
    #@comment = @post.comments.order("created_at DESC").page(params[:page]).per_page(35)
    #@highestVoted = Comment.order("created_at DESC").get_votes.size
    @comment11 = @post.comments.where(hidden: nil).where('cached_votes_score < 0').where('cached_votes_score > -3').ordered
    @comment10 = @post.comments.where(hidden: nil).where('cached_votes_score > -1').where('cached_votes_score < 10').ordered
    @comment9 = @post.comments.where(hidden: nil).where('cached_votes_score > 9').where('cached_votes_score < 20').ordered
    @comment8 = @post.comments.where(hidden: nil).where('cached_votes_score > 19').where('cached_votes_score < 40').ordered
    @comment7 = @post.comments.where(hidden: nil).where('cached_votes_score > 39').where('cached_votes_score < 80').ordered
    @comment6 = @post.comments.where(hidden: nil).where('cached_votes_score > 79').where('cached_votes_score < 160').ordered
    @comment5 = @post.comments.where(hidden: nil).where('cached_votes_score > 159').where('cached_votes_score < 320').ordered
    @comment4 = @post.comments.where(hidden: nil).where('cached_votes_score > 319').where('cached_votes_score < 640').ordered
    @comment3 = @post.comments.where(hidden: nil).where('cached_votes_score > 639').where('cached_votes_score < 1280').ordered
    @comment2 = @post.comments.where(hidden: nil).where('cached_votes_score > 1279').where('cached_votes_score < 2560').ordered
    @comment1 = @post.comments.where(hidden: nil).where('cached_votes_score > 2559').ordered
    @commentbefore = [@comment1, @comment2,@comment3,@comment4,@comment5,@comment6,@comment7,@comment8,@comment9,@comment10,@comment11].flatten
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
    if !params[:base64].present? && @post.image.exists?
      dimensions = Paperclip::Geometry.from_file(@post.image.queued_for_write[:medium].path)
      puts 'noooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
      puts dimensions
      puts 'noooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
      if dimensions.height > 950
        @post.long = true
      end
    end
    if !@post.imageaddress.blank?
      @post.image2 = URI.parse(  @post.imageaddress  )
    end
    unless !params[:anonymous].present?
      @post.anonymous = true
    end
    #if Post.tag_counts_on(params[:trend]).count == 0
    #  ActionController::Base.new.expire_fragment('makememe')
    #end
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
    puts 's s s s'
    puts @post
    if @post.save
      
      redirect_to @post
      flash[:notice] = "Post uploaded"
      if !params[:anonymous].present?
        @post.create_activity :create, owner: current_user, key: 'posting'
      end
    else
      redirect_to '/'
      flash[:notice] = "Post wasn't uploaded"
    end
  end
  
  def upvote
    @post = Post.find(params[:id])
    if params.has_key?(:favor)
      if !current_user.voted_on? @post, vote_scope: 'favor'
        @post.vote_by :voter => current_user, :vote_scope => 'favor'
        puts 'faaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      else 
        @post.unvote_by current_user
        flash.now[:notice] = 'Favored'
        @post.unvote_by current_user, vote_scope: 'favor'
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
          PublicActivity::Activity.where(key: 'upvoting', trackable_id: @post.id, owner: current_user).destroy_all
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
    if !params[:post][:user_id].blank?
      puts 'sssssssssssssssssssssssssssssssss'
      @user = User.find(params[:post][:user_id])
      @post = @user.posts.find(params[:id])
      @post.user = @user
      @post.user_id = @user.id
      @post.granted = true
      @post.hidden = nil
      @post.update_attributes(permit_post)
      Rails.logger.info(@post.errors.messages.inspect)
    else
      puts params[:user_id]
      puts params[:post][:user_id]
      @post = current_user.posts.find(params[:id])
      @post.user_id = current_user.id
      @post.user = current_user
      @post.update_attributes(permit_post)
      Rails.logger.info(@post.errors.messages.inspect)
    end
    if params[:title]
      puts 'ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss'
      @post.title = params[:title]
      @post.user_id = current_user.id
      @post.user = current_user
      @post.update_attributes(permit_post)
    end
    respond_to do |format|
     format.html
     format.js
    end
    
    #end
  end
  
  def destroy
    @post = Post.find(params[:id])
    if current_user == @post.user
      @post.destroy
      PublicActivity::Activity.where(key: 'upvoting', trackable_id: @post.id).destroy_all
      #PublicActivity::Activity.where(key: 'upvoting', trackable_id: @post.id).destroy_all
    else
      @post.destroy
      @post.user.create_activity :create, key: 'drolling', recipient: @post.user, parameters: {url: url_for(@post), what: 'Your post has been deleted.'}
    end
    respond_to do |format|
     format.html
     format.js
    end
  end
  
  def report
    @postt = Post.find(params[:id])
    @postuser = @postt.user
    @post = @postuser.posts.find(params[:id])
    @post.user_id = current_user.id
    @post.user = @postuser
    #@post.hidden = true
    #        @post.update_attributes(permit_post2)
    #        Rails.logger.info(@post.errors.messages.inspect)
    if !current_user.voted_on? @post, vote_scope: 'report'
        @post.downvote_from current_user, :vote_scope => 'report'
        unless @post.granted == true
          @post.reported = true
          #@post.hidden = true
          @post.update_attributes(permit_post2)
        end
        if @post.get_downvotes(:vote_scope => 'report').size == 3
          unless @post.granted == true
            @post.reported = true
            @post.hidden = true
            @post.update_attributes(permit_post2)
            Rails.logger.info(@post.errors.messages.inspect)
          end
          @post.user.create_activity :create, key: 'drolling', recipient: @post.user, parameters: {url: url_for(@post), what: 'Your post is now hidden for review.'}
        end
        PublicActivity::Activity.where(key: 'upvoting', trackable_id: @post.id, owner: current_user).destroy_all
    else
      @post.unvote_by current_user, vote_scope: 'report'
    end
    
    redirect_to :back
  end
  
  def downvote
    @post = Post.find(params[:id])
      if current_user.voted_down_on? @post
        @post.unvote_by current_user
        #@post.create_activity :upvote, owner: current_user, key: 'upvoting'
      else
        @post.downvote_by current_user
        unless @post.granted == true
          if (@post.created_at > Time.now - 7.minutes) && @post.get_downvotes.size == 5
            @post.hidden = true
            @post.update_attributes(permit_post2)
            Rails.logger.info(@post.errors.messages.inspect)
            @post.user.create_activity :create, key: 'drolling', recipient: @post.user, parameters: {url: url_for(@post), what: 'Your post is now hidden for review.'}
          #elsif ( ( 100 * @post.get_downvotes.size ) / @post.get_upvotes.size) > 50
          #  @post.hidden = true
          #  @post.update_attributes(permit_post2)
          #  Rails.logger.info(@post.errors.messages.inspect)
          #  @post.user.create_activity :create, key: 'drolling', recipient: @post.user, parameters: {url: url_for(@post), what: 'Your post is now hidden for review.'}
          end
        end
        
      end
    redirect_to :back
    
  end
  
  private 
    def permit_post
    params.require(:post).permit(:image, :title, :long, :anonymous, :facenumber, :hidden, :granted, :tag_list, :giphyid,:image2, :imageaddress, :video64, :video, :trend_list );
    end
    def permit_post2
      params.permit(:hidden, :id);
    end
end