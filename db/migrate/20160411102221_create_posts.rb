class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.text :title
      t.integer :posts, :default => 0
      t.timestamps null: false
    end
    #add_index :posts, [:user_id, :created_at]
  end
end