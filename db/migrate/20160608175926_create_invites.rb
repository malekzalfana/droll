class CreateInvites < ActiveRecord::Migration
  def change
    create_table :invites do |t|
      t.integer :code

      t.timestamps null: false
    end
  end
end
