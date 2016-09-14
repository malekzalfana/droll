class ActivitiesController < ApplicationController
  def index
    @activities = PublicActivity::Activity.order("created_at DESC").limit(20).all
  end
end
