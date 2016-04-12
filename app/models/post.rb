class Post < ActiveRecord::Base
    has_attached_file :image, styles: { medium: "550x550>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
    validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
    belongs_to :user
    #validates :user_id, presence: true
    validates :image, presence: true
    #default_scope -> { order(created_at :desc) }
    #@post = @post.order(created_at: :desc)
    #@post = Post.order("created_at DESC").all
    default_scope { order("created_at DESC")}
end
