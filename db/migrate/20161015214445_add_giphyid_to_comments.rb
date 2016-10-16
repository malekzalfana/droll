class AddGiphyidToComments < ActiveRecord::Migration
  def change
    add_column :comments, :giphyid, :string
  end
end
