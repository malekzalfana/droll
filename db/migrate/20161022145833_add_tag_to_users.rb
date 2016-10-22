class AddTagToUsers < ActiveRecord::Migration
  def change
    add_column :users, :tag, :string
  end
end
