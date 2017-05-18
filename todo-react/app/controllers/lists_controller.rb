#:nodoc:
class ListsController < ApplicationController
  def index
    @todos = Todo.all.order(:id)
  end
end
