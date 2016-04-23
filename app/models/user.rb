class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  acts_as_voter
  is_impressionable
  has_attached_file :image, :styles => { :medium => "300x300>", :thumb => "100x100#" }, :default_url => "missing.jpg"                
  has_many :posts, dependent: :destroy
  
  has_many :active_relationships, class_name: 'Relationship', foreign_key: "follower_id", dependent: :destroy
  has_many :passive_relationships, class_name: 'Relationship', foreign_key: "followed_id", dependent: :destroy
  
  has_many :following, through: :active_relationships, source: :followed
  has_many :following, through: :passive_relationships, source: :follower
  
  has_many :comments
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  validates_attachment :image,
                     content_type: { content_type: ["image/jpeg", "image/gif", "image/png"] }
  
  def follow(other)
    active_relationships.create(followed_id: other.id)
  end
  
  def unfollow(other)
    active_relationships.create(followed_id: other.id)
  end
  
  def following?(other)
    following.include?(other)
  end  
  
end
