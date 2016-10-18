class FixStockType < ActiveRecord::Migration
  def change
    rename_column :stocks, :type, :stocktype
  end
end
