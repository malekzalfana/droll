class InvitesController < ApplicationController
    def new
        @invite = Invite.new
    end
    def create
        @user = current_user
        @invite = @user.invites.build
        @invite.code = rand(1000..9000)
        puts 'ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss'
        puts current_user.invites.count
        puts 'ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss'
        @invite.save
        redirect_to '/'
      end
end    