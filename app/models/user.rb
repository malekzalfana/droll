class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  acts_as_voter
  is_impressionable
  has_attached_file :image, :styles => { :medium => "300x300>", :thumb => "100x100#" }, :default_url => "missing.jpg"                
  has_many :posts
  has_many :comments
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  validates_attachment :image,
                     content_type: { content_type: ["image/jpeg", "image/gif", "image/png"] }
end
