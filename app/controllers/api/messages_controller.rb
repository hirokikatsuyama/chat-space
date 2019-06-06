class Api::MessagesController < ApplicationController
  def index
    @message = Message.new
    @group = Group.find(params[:group_id])
    # respond_to do |format|
    # binding.pry
      # format.html { @additional_messages =  Message.where("id > ?", params[:id]) } 
    @messages =  @group.messages.where("id > ?", params[:id])
      # params.require("id"
      # last_message_idだとbinding.pryが使えなくなる
    # end
  end  
end
