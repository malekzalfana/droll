class TagsController < ApplicationController
  def index
    @tags = ActsAsTaggableOn::Tag.all
  end

  def tag
    @tag =  params[:name]
    @trends = Post.tag_counts_on(:trends).limit(7)
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
    @post = Post.tagged_with(@tag).where(hidden: nil).order("created_at DESC").paginate(:per_page => 35, :page => 1)

    # .reject{ |e| @anonymous.include? e }
    respond_to do |format|
     format.html
     format.js
    end
  end


  def trends
    @trends = Post.tag_counts_on(:trends).limit(50)
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
      @activities1 = PublicActivity::Activity.order("created_at DESC").where( recipient: current_user)
      #@activities0 = PublicActivity::Activity.order("created_at DESC").where( owner_id: current_user.following.ids ).where( key: "posting" ).where("created_at > ?", PublicActivity::Activity.where(key: 'following', recipient: current_user, owner: ).created_at  )
      @activities0 = PublicActivity::Activity.order("created_at DESC").where( owner_id: current_user.following.ids, key: "posting" ).where('created_at >= ?', Time.now-2.days)
      @activities2 = PublicActivity::Activity.where( key: 'drolling').order("created_at DESC")
      @activities3 = [@activities1, @activities2, @activities0].flatten
      @activities = @activities3.sort_by{|e| e[:created_at]}.reverse.paginate(:per_page => 25, :page => 1)
    end
  end

  def trend

    @trend =  params[:name]
    @postnumber =  Post.tagged_with(@trend).size
    #@upvotenumber = Post.tagged_with(@trend).all.get_upvotes.size
    #@upvotenumber = Post.tagged_with(@trend).comments.size
  #@commentnumber = Post.tagged_with(@trend).all.comments.size
    @trends = Post.tag_counts_on(:trends).limit(7)
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
    @post = Post.tagged_with(@trend).where(hidden: nil).order("created_at DESC").paginate(:per_page => 35, :page => 1)

    # .reject{ |e| @anonymous.include? e }
    respond_to do |format|
     format.html
     format.js
    end
  end



end