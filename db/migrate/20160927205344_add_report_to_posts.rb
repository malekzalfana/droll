class AddReportToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :report, :boolean
  end
end
