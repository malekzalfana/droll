class AddUrlToStocks < ActiveRecord::Migration
  def change
    add_column :stocks, :url, :string
  end
end
