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
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:username, :email, :password, :password_confirmation, :remember_me, :image, :cover, :pic,:bio, :notificationsound, :nightmode, :pro, :share, :pic, :new, :ref) }
    devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:username, :email, :password, :password_confirmation, :remember_me, :pic, :new, :ref) }
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:email, :password, :password_confirmation,:current_password, :remember_me, :image, :ref, :cover, :pic, :username, :bio, :notificationsound, :nightmode, :share, :tag, :pic, :new) }
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
    puts "ssssssss"
    puts URI(request.referer).path
    @url = URI(request.referer) #.path.slice! "/"
    #response.location = @url
    if @url == '/make'
      response.location = '/make'
    elsif @url == '/settings'
      response.location = '/settings'
    elsif @url == '/recent'
      response.location = '/recent'
    elsif Rails.application.routes.recognize_path(request.referrer)[:action] == 'show'
      response.location = @url
    else
      response.location = '/'
    end

  end

end
