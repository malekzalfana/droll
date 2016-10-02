class RemoveReportFromPosts < ActiveRecord::Migration
  def change
    remove_column :posts, :report, :boolean
  end
end
