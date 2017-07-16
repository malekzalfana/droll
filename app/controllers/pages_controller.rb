class PagesController < ApplicationController
  #protected

  #impressionist :actions=>[:recent,:index], unique: [:session_hash]
  #require 'will_paginate/array
  #before_filter :authenticate_user!, :only => [:index, :edit, :update, :destroy]
  #def update_resource(resource, params)
  #  resource.update_without_password(params)
  #end

  #caches_page :makememe


  def index
    @randomPic = rand(1..50)
    @alltrends = Trend.all
    #if user_signed_in? && current_user.passed != true && Time.now - current_user.created_at  < 10
    #  #redirect_to '/make'
   #   puts "nothing"
    #else

    unless session[:display_welcome]
        @welcomeMessage = true
        session[:display_welcome] = true
    end
    @trends = Trend.all.limit(15)
    @url =  request.base_url + request.original_fullpath
    if @url.include?('?app=true') && user_signed_in? && !@url.include?('&signed=')
      redirect_to request.base_url + request.original_fullpath + '&username=' + current_user.username + '&imageurl=' + current_user.image.url(:thumb) + '&signed=true'
    elsif @url.include?('?app=true') && !user_signed_in? && !@url.include?('&signed=false')
      redirect_to request.base_url + request.original_fullpath + '&signed=false'
    else
        if current_user && current_user.sign_in_count == 1
      unless session[:display_welcome]
        @welcomeMessage = true
        session[:display_welcome] = true
      end
    end
    if user_signed_in?
      if current_user.trends.blank?
        @trendArray = ''
      else
        @trendArray = current_user.trends.split(',')
      end
      @randomUsers = User.where.not(:id => current_user.following).except(current_user).limit(4)

      @popularPosts = Post.where(hidden: nil).where('cached_votes_up > 10')
      @trendPosts = Post.where(trendid: @trendArray, hidden: nil)#.where('cached_votes_up > -1')
      @followingPosts = Post.where(hidden: nil).where(:user_id => current_user.following)#.where("created_at < ?", 2.days.ago)
    #remove # up >>^^^^
      @post2 = [@popularPosts,@followingPosts, @trendPosts].flatten
      @post2 = @post2.uniq
      @post = @post2.sort_by{|e| e[:time_ago]}.paginate(:per_page => 10, :page => params[:page])
      #@post = Post.limit(30).paginate(:per_page => 10, :page => params[:page])
      @pre_newposts = Post.where(hidden: nil).where('cached_votes_up < 10').order("created_at DESC")
      @newposts = @pre_newposts#.reject{ |e| @post.include? e }
      @newposts = @newposts.paginate(:per_page => 9, :page => params[:page])
      #  .reverse! user this for reversing the order of posts
      # add the user not nil !!!!!
    else
      @post = Post.where(hidden: nil).order("created_at DESC").paginate(:per_page => 10, :page => params[:page])
    end

    #@activities = PublicActivity::Activity.ordered.commenting.posting.upvoting.following.mentioning.ordered.limit.all
#=begin
    if user_signed_in?
      @activities = PublicActivity::Activity.order("created_at DESC").where( recipient: current_user).limit(25).all
      @p1 = if current_user.posts.count == 0 then '0' else '1' end
      @p2 = if current_user.image.url(:medium) == 'missing.jpg' then '0' else '1' end
      @p3 = if current_user.cover.url(:medium) == 'missing-2.png' then '0' else '1' end
      @p4 = if current_user.bio.blank? then '0' else '1' end
      @pTotal = ( (@p1.to_f + @p2.to_f + @p3.to_f + @p4.to_f)/4 )*100
    end
#=end
    respond_to do |format|
     format.html
     format.js
     format.json {render json:  @post }
    end
    end
    #end



  end


  def signup2

    @url =  request.base_url + request.original_fullpath
    if  user_signed_in? && !@url.include?('/?signed=true')
      redirect_to request.base_url + request.original_fullpath + '/?signed=true'
    #elsif !user_signed_in? && !@url.include?('/?signed=false')
    #  redirect_to request.base_url + request.original_fullpath#+ '/?signed=false'
    end
  end

  def new
    @post = Post.where(trendid: nil).all
  end

  def admin
    if user_signed_in?

      @post1 = Post.where(hidden: true).order("created_at DESC")
    #@post2 = Post.where(reported: true).order("created_at DESC")
    #@postb = [@post1,@post2].flatten
    @post = @post1.paginate(:per_page => 30, :page => params[:page])

    puts "Ssssssssssssssssssssssssssssssssssssssssssssssssssss"

    @posts = Post.all
    @posts.each do |post|
      puts "starteddddddddddddddddddddddddddddddddddd"
      puts post.trend_list
      if !post.trend_list.blank?
        puts "passed first"
        @trendname = post.trend_list
        if post.trendid.blank?
          puts "passed"
          if Trend.where(name: @trendname).first.present?
            puts "changed the id?"
            puts post.trendid
            post.trendid = Trend.where(name: @trendname).first.id
            post.save
            puts post.trendid
          else
            puts "created new"
            @trend = Trend.create(name: @trendname)
            post.trendid = @trend.id
            post.save
          end
        else
        end

      end
      end


    else
      redirect_to '/'
    end



  end

  def explore
    @url =  request.base_url + request.original_fullpath
    if @url.include?('?app=true') && user_signed_in? && !@url.include?('&signed=')
      redirect_to request.base_url + request.original_fullpath + '/?app=true&username=' + current_user.username + '&imageurl=' + current_user.image.url(:thumb) + '&signed=true'
    else
      @trends = Trend.all.limit(15)
    if user_signed_in?
      @randomUsers = User.where.not(:id => current_user.following).except(current_user).limit(4)
      unless session[:swipe]
        @swipeMessage = true
        session[:swipe] = true
      end
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
    @post = Post.where(hidden: nil).order("created_at DESC").page(params[:page]).per_page(10)

    # .reject{ |e| @anonymous.include? e }
    respond_to do |format|
     format.html
     format.js
     format.json {render json:  @post }
    end
    end


  end

  def about

  end

  def reprofile
    if user_signed_in?
      redirect_to '/user/' + current_user.username + '/?app=true&username=' + current_user.username + '&imageurl=' + current_user.image.url(:thumb) + '&signed=true'
    else
      redirect_to '/notlogged'
    end
  end

  def notlogged
  end

  def contact

  end
  def terms

  end

  def renderTrends
    @alltrends = Trend.all
    respond_to do |format|
     format.html
     format.js
    end
  end

  def notifications
    @url =  request.base_url + request.original_fullpath
    if @url.include?('?app=true') && user_signed_in? && !@url.include?('&signed=')
      redirect_to request.base_url + request.original_fullpath + '/?app=true&username=' + current_user.username + '&imageurl=' + current_user.image.url(:thumb) + '&signed=true'
    else
      if user_signed_in?
      @activities1 = PublicActivity::Activity.order("created_at DESC").where( recipient: current_user)
      #@activities0 = PublicActivity::Activity.order("created_at DESC").where( owner_id: current_user.following.ids ).where( key: "posting" ).where("created_at > ?", PublicActivity::Activity.where(key: 'following', recipient: current_user, owner: ).created_at  )
      @activities0 = PublicActivity::Activity.order("created_at DESC").where( owner_id: current_user.following.ids, key: "posting" ).where('created_at >= ?', Time.now-2.days)
      @activities2 = PublicActivity::Activity.where( key: 'drolling').order("created_at DESC")
      @activities3 = [@activities1, @activities2, @activities0].flatten
      @activities = @activities3.sort_by{|e| e[:created_at]}.reverse.paginate(:per_page => 25, :page => 1)
    end
    end

  end

  def make
    @trend = false
    @url =  request.base_url + request.original_fullpath
    if @url.include?('trend')
      @trend = @url.match(/\?trend=.*/).to_s
      @trend.slice! "?trend="
    end
    if user_signed_in?
      @activities1 = PublicActivity::Activity.order("created_at DESC").where( recipient: current_user)
      @activities0 = PublicActivity::Activity.order("created_at DESC").where( owner_id: current_user.following.ids, key: "posting" ).where('created_at >= ?', Time.now-2.days)
      @activities2 = PublicActivity::Activity.where( key: 'drolling').order("created_at DESC")
      @activities3 = [@activities1, @activities2, @activities0].flatten
      @activities = @activities3.sort_by{|e| e[:created_at]}.reverse.paginate(:per_page => 25, :page => 1)
      @post = current_user.posts.build(params[:post])
      @stock1 = current_user.stocks.where(stocktype: 'meme').order("created_at DESC")
      @stock2 = current_user.stocks.where(stocktype: 'rage').order("created_at DESC")
    else
      @post = Post.new
    end
    @trends = Trend.all.limit(15)
      @trendname = Trend.all
  end

  def memes
    if user_signed_in?
      @activities1 = PublicActivity::Activity.order("created_at DESC").where( recipient: current_user)
      @activities0 = PublicActivity::Activity.order("created_at DESC").where( owner_id: current_user.following.ids, key: "posting" ).where('created_at >= ?', Time.now-2.days)
      @activities2 = PublicActivity::Activity.where( key: 'drolling').order("created_at DESC")
      @activities3 = [@activities1, @activities2, @activities0].flatten
      @activities = @activities3.sort_by{|e| e[:created_at]}.reverse.paginate(:per_page => 25, :page => 1)
      @post = current_user.posts.build(params[:post])
      @stock1 = current_user.stocks.where(stocktype: 'meme').order("created_at DESC")
      @stock2 = current_user.stocks.where(stocktype: 'rage').order("created_at DESC")
      @trends = Trend.all.limit(15)
      @trendname = Trend.all
    end
    #@post = current_user.posts.build(params[:post])
    @trends = Trend.all.limit(15)
      @trendname = Trend.all
  end
  def ragaecomics
  end
  def gifs
  end

  def acceptUser
    if params[:userid]
      puts params[:userid]
      @newuser = User.find( params[:userid] )
      @newuser.passed = true
      @newuser.save
      puts @newuser.passed
    elsif params[:username1]
      puts params[:username1]
      puts "Sssssssssssssssssssssss"
      current_user.username = params[:username1];
      current_user.save
      @username1 = true
      #redirect_to "/"
    elsif params[:acceptAll]
      puts "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
      puts User.where(passed: nil, posted: true).size
      User.where(passed: nil, posted: true).update_all(passed: true )
    end


  end

  def makememe
    #expire_fragment('javascript')
    #expire_fragment('css')
    @memenumber = params[:memenumber]
    @post = current_user.posts.build(params[:post])
    @stock1 = current_user.stocks.where(stocktype: 'meme').order("created_at DESC")
    @stock2 = current_user.stocks.where(stocktype: 'rage').order("created_at DESC")
    @trends = Trend.all.limit(15)
  end

  def make2
    @activities = PublicActivity::Activity.order("created_at DESC").where( recipient: current_user).limit(25).all
    if user_signed_in?
     @post = current_user.posts.build(params[:post])
   end
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

  def followTags
    if !params[:tag].nil?
      puts params[:tag]
      current_user.tag = params[:tag]
      current_user.update_attributes
    end
    redirect_to :back
  end


  def feedback
    @feedback = Feedback.create
    @feedback.text = params[:text]
    @feedback.user = params[:user]
    @feedback.save
  end

  def stock
    if params[:base64]

      if !Stock.where(base64: params[:base64]).present?

      @stock = Stock.create
      @stock.base64 = params[:base64]
      @stock.stocktype = params[:stocktype]
      @stock.image = URI.parse(  params[:base64]  )
      @stock.user = current_user
      @stock.save
      if @stock.save
        respond_to do |format|
         format.html
         format.js
        end
      end

    else
      puts "already made on!!!!!!!!!!!!!"
      redirect_to :back
    end


    end

  end

  def deleteStock
    @stockid = params[:id]
    @stock = Stock.find(params[:id])
    puts @stock.image.url
    @stock.destroy
    respond_to do |format|
     format.html
     format.js
    end
  end

  def loadPost
    @postid = params[:postid]
    @post = Post.find(@postid)
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
    @commentbefore = [@comment1, @comment2,@comment3,@comment4,@comment5,@comment6,@comment7,@comment8,@comment9,@comment10, @comment11].flatten
    @comment = @commentbefore.paginate(:per_page => 35, :page => params[:page])
    respond_to do |format|
     format.html
     format.js
    end
    puts 'ssssssssssssssssss'
  end

  def load_activities
    @activities = PublicActivity::Activity.order('created_at DESC').where( (PublicActivity::Activity.key == 'upvoting' && PublicActivity::Activity.trackable.user == current_user && PublicActivity::Activity.owner != current_user)  || PublicActivity::Activity.key == 'posting' && PublicActivity::Activity.trackable.user != current_user && current_user.following?(PublicActivity::Activity.trackable.user)  || PublicActivity::Activity.key == 'commenting' && PublicActivity::Activity.trackable.user != current_user ).limit(20)
  end

  def signup

  end

  def sitemap
    @post = Post.where(hidden: nil)
    @tag = ActsAsTaggableOn::Tag.all
    @trend = ActsAsTaggableOn::Tag.all
    @users = User.all
    respond_to do |format|
        format.xml { render layout: false }
        format.txt { render layout: false }
    end
  end

  def profile
    @recusers = User.where.not(username: nil).order("RANDOM()").first(20)
    if (User.find_by_username(params[:id]))
      @username = params[:id]
      @user = User.find_by_username(params[:id])
    else
      redirect_to root_path, :notice => "User not found"
    end
    @profilepost = Post.all.where("user_id = ?", User.find_by_username(params[:id]).id ).where(hidden: nil).where(anonymous: false).paginate :page => params[:page], :per_page => 2
    @activities = PublicActivity::Activity.order("created_at DESC").where( recipient: current_user).limit(25).all
    @profilefavor = @user.votes.where(:vote_scope => 'favor').for_type(Post).votables.paginate :page => params[:page], :per_page => 8
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
