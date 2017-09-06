class AddPushpointsToTrends < ActiveRecord::Migration
  def change
    add_column :trends, :pushpoints, :integer
  end
end
