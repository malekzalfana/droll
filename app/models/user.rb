class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  include PublicActivity::Common
  serialize :preferences
  acts_as_voter
  is_impressionable
  has_attached_file :image, :styles => { :medium => "300x300>", :thumb => "100x100#" }, :default_url => "missing.jpg"
  has_attached_file :cover, :styles => { :medium => "300x300>", :thumb => "100x100#" }, :default_url => "missing-2.jpg"
  has_many :posts, dependent: :destroy
  
  has_many :active_relationships, class_name: 'Relationship', foreign_key: "follower_id", dependent: :destroy
  has_many :passive_relationships, class_name: 'Relationship', foreign_key: "followed_id", dependent: :destroy
  
  has_many :following, through: :active_relationships, source: :followed
  has_many :followers, through: :passive_relationships, source: :follower
  has_many :invites, :dependent => :destroy
  has_many :comments, :dependent => :destroy
  devise :database_authenticatable, :registerable, :omniauthable,
         :recoverable, :rememberable, :trackable, :validatable
  validates_attachment :image, :cover,
                     content_type: { content_type: ["image/jpeg", "image/gif", "image/png"] }
  
  def follow(other)
    active_relationships.create(followed_id: other.id)
  end
  
  def unfollow(other)
    active_relationships.find_by(followed_id: other.id).destroy
  end
  
  def following?(other)
    following.include?(other)
  end  
  
  def update_with_password(params, *options)
    current_password = params.delete(:current_password)
  
  if params[:password].blank?
    params.delete(:password)
    params.delete(:password_confirmation) if params[:password_confirmation].blank?
  end
  
  result = if params[:password].blank? || valid_password?(current_password)
    update_attributes(params, *options)
  else
    self.assign_attributes(params, *options)
    self.valid?
    self.errors.add(:current_password, current_password.blank? ? :blank : :invalid)
    false
  end
  
      clean_up_passwords
      result
  end
  
  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.username = auth.info.nickname
    end
  end
  
  
  
  def self.new_with_session(params, session)
    if session["devise.user_attributes"]
      new(session["devise.user_attributes"], without_protection: true) do |user|
        user.attributes = params
        user.valid?
      end
    else
      super
    end
  end
  
  def password_required?
    super && provider.blank?
  end
  
  def update_with_password(params, * options)
    if encrypted_password.blank?
      update_attributes(params, * options)
    else
      super
    end
  end
  
  
  
end