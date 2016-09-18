class PagesController < ApplicationController
  #protected
  impressionist :actions=>[:recent,:index], unique: [:session_hash]
  #require 'will_paginate/array
  #before_filter :authenticate_user!, :only => [:index, :edit, :update, :destroy]

  #def update_resource(resource, params)
  #  resource.update_without_password(params)
  #end
  def index
    #@post = Post.limit(20)
    #@post = Post.paginate(page: params[:page], per_page: 15).order('created_at DESC')
    #@post = Post.order("created_at DESC").page(params[:page]).per_page(10)
    if user_signed_in?
      @popularPosts = Post.where('cached_votes_up > ?', 3)
      #@popularPosts = Post.all(:order => "vote_total DESC")
      @followingPosts = Post.where(:user_id => current_user.following)
      #@post = Post.where("cached_votes_score > ? or :user_id = ?", 1, current_user.following)
      @post2 = [@popularPosts,@followingPosts].flatten
      @post = @post2.sort_by{|e| e[:time_ago]}.paginate(:per_page => 10, :page => params[:page])
      #  .reverse! user this for reversing the order of posts
      # add the user not nil !!!!!
    else
      @post = Post.order("created_at DESC").paginate(:per_page => 10, :page => params[:page])
    end
    
    #@activities = PublicActivity::Activity.ordered.commenting.posting.upvoting.following.mentioning.ordered.limit.all
    if user_signed_in?
      @activities = PublicActivity::Activity.order("created_at DESC").where( recipient: current_user).limit(25).all
      @p1 = if current_user.posts.count == 0 then '0' else '1' end
      @p2 = if current_user.image.url(:medium) == 'missing.jpg' then '0' else '1' end
      @p3 = if current_user.cover.url(:medium) == 'missing-2.png' then '0' else '1' end 
      @p4 = if current_user.bio.blank? then '0' else '1' end
      @pTotal = ( (@p1.to_f + @p2.to_f + @p3.to_f + @p4.to_f)/4 )*100
    end  
    respond_to do |format|
     format.html
     format.js
    end
  end
  
  def recent
    if user_signed_in?
      @p1 = if current_user.posts.count == 0 then '0' else '1' end
      @p2 = if current_user.image.url(:medium) == 'missing.jpg' then '0' else '1' end
      @p3 = if current_user.cover.url(:medium) == 'missing-2.png' then '0' else '1' end 
      @p4 = if current_user.bio.blank? then '0' else '1' end
      @pTotal = ( (@p1.to_f + @p2.to_f + @p3.to_f + @p4.to_f)/4 )*100
      #@activities = PublicActivity::Activity.order("created_at DESC").where(recipient: current_user).limit(25).all
      @activities1 = PublicActivity::Activity.order("created_at DESC").where( recipient: current_user)
      #@activities0 = PublicActivity::Activity.order("created_at DESC").where( owner_id: current_user.following.ids ).where( key: "posting" ).where("created_at > ?", PublicActivity::Activity.where(key: 'following', recipient: current_user, owner: ).created_at  )
      @activities0 = PublicActivity::Activity.order("created_at DESC").where( owner_id: current_user.following.ids, key: "posting" ).where('created_at >= ?', Time.now-2.days)
      @activities2 = PublicActivity::Activity.where( key: 'drolling').order("created_at DESC")
      @activities3 = [@activities1, @activities2, @activities0].flatten
      @activities = @activities3.sort_by{|e| e[:created_at]}.reverse.paginate(:per_page => 25, :page => 1)
    end  
    @post = Post.order("created_at DESC").page(params[:page]).per_page(10)
    
    # .reject{ |e| @anonymous.include? e }
    respond_to do |format|
     format.html
     format.js 
    end
    
  end
  
  def about
    
  end
  def contact
    
  end
  def terms
    
  end
  
  def make
    @activities = PublicActivity::Activity.order("created_at DESC").where( recipient: current_user).limit(25).all
    @post = current_user.posts.build(params[:post])
  end  
  
  def make2
    @activities = PublicActivity::Activity.order("created_at DESC").where( recipient: current_user).limit(25).all
    @post = current_user.posts.build(params[:post])
  end  
  
  def settings
    @activities = PublicActivity::Activity.order("created_at DESC").where( recipient: current_user).limit(25).all
      @user = current_user
  end
  helper SettingsHelper
  
  def register
    @user = current_user
    @invite = Invite.new
  end
  
  def invited
    @comment = Comment.all.limit(10)
  end
  
  
  def loadPost
    @postid = params[:postid]
    @post = Post.find(@postid)
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
    @comment = @commentbefore.paginate(:per_page => 35, :page => params[:page])
    respond_to do |format|
     format.html
     format.js
    end
  end

  def load_activities
    @activities = PublicActivity::Activity.order('created_at DESC').where( (PublicActivity::Activity.key == 'upvoting' && PublicActivity::Activity.trackable.user == current_user && PublicActivity::Activity.owner != current_user)  || PublicActivity::Activity.key == 'posting' && PublicActivity::Activity.trackable.user != current_user && current_user.following?(PublicActivity::Activity.trackable.user)  || PublicActivity::Activity.key == 'commenting' && PublicActivity::Activity.trackable.user != current_user ).limit(20)
  end

  def signup
    
  end

  def profile
    if (User.find_by_username(params[:id]))
      @username = params[:id]
      @user = User.find_by_username(params[:id])
    else 
      redirect_to root_path, :notice => "User not found"
    end  
    @profilepost = Post.all.where("user_id = ?", User.find_by_username(params[:id]).id ).where(anonymous: false).paginate(:per_page => 5, :page => params[:page])
    @activities = PublicActivity::Activity.order("created_at DESC").where( recipient: current_user).limit(25).all
    @profilefavor = @user.votes.where(:vote_scope => 'favor').for_type(Post).votables.paginate(:per_page => 5, :page => params[:page])
    respond_to do |format|
     format.html
     format.js
    end
  end

  def checkUsername
    if params[:user].present?
      @params = params[:user][:name]
      if @params != current_user.username
        if @params.length < 3
          @usernamecheck = true
        else
          if @params.length > 13
            @usernamecheck = true
          end  
          @usernamecheck = User.exists?(username: @params)
        end
      else
        @usernamecheck = false
      end  
    
    else  
      @params = params[:name]
      if @params.length < 3
        @usernamecheck = true
      else
        @usernamecheck = User.exists?(username: @params)
        if @params.length > 13
          @usernamecheck = true
        end  
      end
    
    end  
    puts @usernamecheck
    puts @params
      respond_to do |format|
       #format.html
        format.js { render "checkUsername"}
      end
    #redirect_to '/'
  end
  
  def checkEmail
    if params[:user].present?
      @params = params[:user][:email]
      if @params != current_user.email
        if @params.length < 3
          @emailcheck = true
        else
          @emailcheck = User.exists?(email: @params)
        end
      else
        @emailcheck = false
      end  
    
    else  
      @params = params[:email]
      if @params.length < 3
        @emailcheck = true
      else
        @emailcheck = User.exists?(email: @params)
      end
    
    end  
    puts @emailcheck
    puts @params
      respond_to do |format|
       #format.html
        format.js { render "checkEmail"}
      end
    #redirect_to '/'
  end
  
  
end
