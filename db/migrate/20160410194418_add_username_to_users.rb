class AddUsernameToUsers < ActiveRecord::Migration
  def change # any change we make here is the translate into an Sql code
  add_column :users, :username, :string  # new username colmn
  add_index :users, :username, unique: true # make sure usernames are unique
  end
end
