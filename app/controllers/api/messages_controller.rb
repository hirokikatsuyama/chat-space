class Api::MessagesController < ApplicationController
  def index
    @message = Message.new
    @group = Group.find(params[:group_id])
    @messages =  @group.messages.where("id > ?", params[:id])
      
  end  
end
