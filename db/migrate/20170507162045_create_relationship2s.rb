class CreateRelationship2s < ActiveRecord::Migration
  def change
    create_table :relationship2s do |t|
      t.integer :follower_id
      t.integer :followed_id
      t.timestamps null: false
    end
    add_index :relationship2s, :follower_id
    add_index :relationship2s, :followed_id
    add_index :relationship2s, [:followed_id, :follower_id], unique: true
  end
end
