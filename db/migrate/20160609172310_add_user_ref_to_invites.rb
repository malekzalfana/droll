class AddUserRefToInvites < ActiveRecord::Migration
  def change
    add_reference :invites, :user, index: true, foreign_key: true
  end
end
