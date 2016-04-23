class Comment < ActiveRecord::Base
    belongs_to :user
    belongs_to :post
    #acts_as_tree order: 'created_at DESC'
    belongs_to :parent,  class_name: "Comment" #-> requires "parent_id" column
    has_many   :replies, class_name: "Comment", foreign_key: :parent_id, dependent: :destroy
end