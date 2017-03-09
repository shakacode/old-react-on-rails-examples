#:nodoc:
class ListsController < ApplicationController
  include ReactOnRails::Controller
  def index
    redux_store("todoListStore", props: Todo.all.order(:id).to_json)
  end
end
