#:nodoc:
class ListsController < ApplicationController
  def index
    @to_dos = ToDo.all.order(:id)
  end
end