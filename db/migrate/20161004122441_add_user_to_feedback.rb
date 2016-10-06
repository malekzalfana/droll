class AddUserToFeedback < ActiveRecord::Migration
  def change
    add_column :feedbacks, :user, :text
  end
end
