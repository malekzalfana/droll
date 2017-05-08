class Relationship2 < ActiveRecord::Base
    belongs_to :follower, class_name: "User"
    belongs_to :following, class_name: "User"
    validates :follower_id, presence: true
    validates :followed_id, presence: true

end
