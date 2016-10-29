class AddGiphyidToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :giphyid, :string
  end
end
