class ApplicationController < ActionController::Base
  include PublicActivity::StoreController
  before_filter :set_current_user
  hide_action :current_user
  def set_current_user
    Post.current_user = current_user
  end
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper Starburst::AnnouncementsHelper
  # call configured parameters
  before_action :configure_permitted_parameters, if: :devise_controller?
  skip_before_action :verify_authenticity_token
  # protect database from being altered while allowing updates
  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:username, :email, :password, :password_confirmation, :remember_me, :image, :cover, :bio, :notificationsound, :nightmode, :pro, :share) }
    devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:username, :email, :password, :password_confirmation, :remember_me) }
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:email, :password, :password_confirmation, :remember_me, :image, :cover, :username, :bio, :notificationsound, :nightmode, :share) }
  end
  
  module SettingsHelper
    def resource_name
      :user
    end
  
    def resource
      @resource ||= User.new
    end
  
    def devise_mapping
      @devise_mapping ||= Devise.mappings[:user]
    end
  end
  
  def after_sign_in_path_for(user)
    puts URI(request.referer).path
    if URI(request.referer).path == '/make'
      response.location = '/make'
    elsif URI(request.referer).path == '/settings'
      response.location = '/settings'
    else
      response.location = '/'
    end
    
  end
  
end
