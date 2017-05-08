class CreateTrends < ActiveRecord::Migration
  def change
    create_table :trends do |t|
      t.text :name

      t.timestamps null: false
    end
  end
end
