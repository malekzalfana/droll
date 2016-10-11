class Stock < ActiveRecord::Base
    
    belongs_to :user
    has_attached_file :image
    #validates :user_id, presence: true
    #validates_attachment_content_type :image, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"], :presence => true
    do_not_validate_attachment_file_type :image
    validates :base64, presence: true
    #validates_presence_of :image
    #validates_attachment :image
end
