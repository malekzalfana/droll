class AddTypeToStocks < ActiveRecord::Migration
  def change
    add_column :stocks, :type, :string
  end
end
