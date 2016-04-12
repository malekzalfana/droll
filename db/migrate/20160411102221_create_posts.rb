class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.text :title
      
      t.timestamps null: false
    end
    #add_index :posts, [:user_id, :created_at]
  end
end