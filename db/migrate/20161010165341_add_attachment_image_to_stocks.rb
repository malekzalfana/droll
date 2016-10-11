class AddAttachmentImageToStocks < ActiveRecord::Migration
  def self.up
    change_table :stocks do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :stocks, :image
  end
end
