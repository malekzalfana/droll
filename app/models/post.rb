class Post < ActiveRecord::Base
    acts_as_votable
    has_attached_file :image, styles: { medium: "550", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
    validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
    belongs_to :user
    validates :user_id, presence: true
    validates :image, presence: true
    default_scope { order("created_at DESC")}
    has_many :comments
    is_impressionable :counter_cache => true, :column_name => :my_column_name, :unique => true
end
