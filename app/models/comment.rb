class Comment < ActiveRecord::Base
    include PublicActivity::Common
    #include PublicActivity::Model
    #tracked owner: ->(controller, model) {controller && controller.current_user}
    has_attached_file :image, styles: { medium: "250" }, default_url: "/images/:style/missing.png"
    validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
    acts_as_votable
    scope :voted1, ->{ where(' -1 < cached_votes_score < 10') }
    scope :voted2, ->{ where(' 9 < cached_votes_score < 20') }
    scope :voted3, ->{ where(' 19 < cached_votes_score < 40') }
    scope :voted4, ->{ where(' 39 < cached_votes_score < 80') }
    scope :voted5, ->{ where(' 79 < cached_votes_score < 160') }
    scope :voted6, ->{ where(' 159 < cached_votes_score < 320') }
    scope :voted7, ->{ where(' 319 < cached_votes_score < 640') }
    scope :voted8, ->{ where(' 639 < cached_votes_score < 1280') }
    scope :voted9, ->{ where(' 1279 < cached_votes_score < 2560') }
    scope :voted10, ->{ where(' 2559 < cached_votes_score') }
    scope :ordered, -> { order(created_at: :desc) }
    belongs_to :user
    belongs_to :post
    belongs_to :parent,  class_name: "Comment" #-> requires "parent_id" column
    has_many   :replies, class_name: "Comment", foreign_key: :parent_id, dependent: :destroy
end