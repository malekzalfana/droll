class TrendsController < ApplicationController
  def index

    @url =  request.base_url + request.original_fullpath
    if @url.include?('?app=true') && user_signed_in? && !@url.include?('&signed=')
      redirect_to request.base_url + request.original_fullpath + '/?app=true&username=' + current_user.username + '&imageurl=' + current_user.image.url(:thumb) + '&signed=true'
    else
      @trends = Trend.all
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
    end
  end

  def trend




=begin
    Post.all.each do |post|
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
=end


    @trend =  Trend.where(name: params[:name]).first

      @postnumber = Post.where(trendid: @trend.id, hidden: nil).size
      @follownumber = @trend.followers
    #@commentnumber = Post.where(trendid: @trend.id, hidden: nil).comments.size
    @trends = Trend.all.limit(15)

    @followed = false
    # && !current_user.trends.blank?
    #@v = current_user.trends.split(',').include?(@trend.id.to_s)
    if user_signed_in? && !current_user.trends.nil? && current_user.trends.tr('[]', '').split(',').map(&:to_i).include?(@trend.id.to_i)
      @followed = true
    end

    if user_signed_in?
      @randomUsers = User.where.not(:id => current_user.following).limit(4)
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
    @post = Post.where(trendid: @trend.id ,hidden: nil).order("created_at DESC").paginate(:per_page => 35, :page => 1)


    puts @trend.id
    puts Post.where(trendid: @trend.id ).size
    puts "ssssssssssssssssss"
    # .reject{ |e| @anonymous.include? e }
    respond_to do |format|
     format.html
     format.js
    end
  end


  def follow
    if user_signed_in? && !current_user.trends.nil?
      @t = current_user.trends#[1..-2].split(',').collect! {|n| n.to_i}
      puts current_user.trends
      puts "string"
    end

    @follow = false
    @thetrend = Trend.find( params[:user][:trendid] )
#=begin
    if current_user.trends.nil?
      @t = []
    else
      @t = @t.tr('[]', '').split(',').map(&:to_i)
    end
    #puts "before-" + current_user.trends
     if @t == []
       puts "ffffffffffffffff first"
       @t.push(params[:user][:trendid].to_i)
       puts @t
       @follow = true
       #current_user.save
     #elsif (current_user.trends =~ /\A\d+\z/) == 0 &&  current_user.trends ==

     elsif @t.include?( params[:user][:trendid].to_i )# ||  @t == params[:user][:trendid]
       puts "uuuuuuuuuuuuuuuu unfollowed"
       #@t = @t.delete(params[:user][:trendid])
       @t.delete(params[:user][:trendid].to_i)
       @thetrend.followers = @thetrend.followers.to_i - 1
       @thetrend.save
       puts @t
       puts

     else
       puts "fffffffffffffffff followed"
       @t = @t.push(params[:user][:trendid].to_i)#(',' + params[:user][:trendid])
       puts @t
        @follow = true
     end
#=end

      if@follow == true
        @thetrend.followers = @thetrend.followers.to_i + 1
        @thetrend.save
      end


      #puts  current_user.trends.include?( params[:user][:trendid] )
      #current_user.trends = "number1"
      current_user.trends = @t
      current_user.save
      #puts "after-" + current_user.trends
      puts current_user.trends
     respond_to do |format|
       #format.html
        format.js { render "follow"}
      end
  end

end
