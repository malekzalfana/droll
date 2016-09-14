class RelationshipsController < ApplicationController
    def create 
        user = User.find(params[:followed_id])
        current_user.follow(user)
        redirect_to :back
        PublicActivity::Activity.where(recipient: user, owner: current_user, key: 'following').destroy_all
        current_user.create_activity :create, owner: current_user, key: 'following', recipient: user
    end    
    def destroy
        user = Relationship.find(params[:id]).followed
        current_user.unfollow(user)
        redirect_to :back
        PublicActivity::Activity.where(recipient: user, owner: current_user, key: 'following').destroy_all
    end
end    