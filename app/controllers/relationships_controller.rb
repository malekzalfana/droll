class RelationshipsController < ApplicationController
    def create 
        user = User.find(params[:followed_id])
        @theuser = user
        if !current_user.following?(user)
            current_user.follow(user)
            PublicActivity::Activity.where(recipient: user, owner: current_user, key: 'following').destroy_all
            current_user.create_activity :create, owner: current_user, key: 'following', recipient: user
            respond_to do |format|
                format.js { render :file => "/pages/follow.js.erb" }
            end
        else
            #user = Relationship.find(params[:id]).followed
            current_user.unfollow(user)
            PublicActivity::Activity.where(recipient: user, owner: current_user, key: 'following').destroy_all
            respond_to do |format|
                format.js { render :file => "/pages/follow.js.erb" }
            end
        end
    end    
    
    def destroy
        user = Relationship.find(params[:id]).followed
        current_user.unfollow(user)
        #redirect_to :back
        PublicActivity::Activity.where(recipient: user, owner: current_user, key: 'following').destroy_all
        respond_to do |format|
            format.js { render :file => "/pages/unfollow.js.erb" }
        end
    end
    
    def follow
        user = User.find(params[:followed_id])
        if !current_user.following?(@post.user)
            current_user.follow(user)
            PublicActivity::Activity.where(recipient: user, owner: current_user, key: 'following').destroy_all
            current_user.create_activity :create, owner: current_user, key: 'following', recipient: user
        else
            user = Relationship.find(params[:id]).followed
            current_user.unfollow(user)
            PublicActivity::Activity.where(recipient: user, owner: current_user, key: 'following').destroy_all
        end
        respond_to do |format|
            format.js { render :file => "/pages/follow.js.erb" }
        end
    end
end    