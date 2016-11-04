class Post < ActiveRecord::Base
    include PublicActivity::Common
    cattr_accessor :current_user
    cattr_accessor :user_id
    #cattr_accessor :tag_list
=begin    
    has_attached_file :video, styles: {
    :medium => {
      :geometry => "x550>",
      :format => 'mp4'
    },
    :thumb => { :geometry => "x550>", :format => 'jpeg', :time => 10}
    }, :processors => [:transcoder]
    validates_attachment_content_type :video, content_type: /\Avideo\/.*\Z/
=end
    has_attached_file :video, :styles => {
      :medium => { :geometry => "640x480", :format => 'flv' },
      :thumb => { :geometry => "100x100#", :format => 'jpg', :time => 10 }
    }, :processors => [:transcoder]
    
    
    acts_as_taggable_on :tags
    #acts_as_taggable_on :tag_list
    #include PublicActivity::Model
    #tracked owner: ->(controller, model) {controller && controller.current_user}
    scope :popular, ->{ where("cached_votes_total > '2'") } # change this to a much bigger number overtime
    scope :following, ->{ where(Post.current_user.following.ids.include? user_id) }
    scope :ordered, -> { order(created_at: :desc) }
    #scope :limited, -> { limit(20) }
    #scope :paginated, -> .paginate(page: params[:page], per_page: 15)
    acts_as_votable
    has_attached_file :image, styles: { medium: "550", large: "600", thumb: "100x100>" }#, default_url: "/missing.png"
    has_attached_file :image2, styles: { medium: "550", large: "600", thumb: "100x100>"  }
    validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
    belongs_to :user
    belongs_to :category
    validates :user_id, presence: true
    #validates :image, presence: true
    default_scope { order("created_at DESC")}
    has_many :comments
    is_impressionable # :counter_cache => true, :column_name => :my_column_name, :unique => true
      def previous_post
        self.class.where("created_at < ?", created_at).order(created_at: :desc).first
      end
      
      def next_post
        self.class.where("created_at > ?", created_at).order(created_at: :asc).last
      end
end