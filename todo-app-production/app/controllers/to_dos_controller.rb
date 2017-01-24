#:nodoc:
class ToDosController < ApplicationController
  before_action :find_todo, only: [:show, :edit, :update, :destroy]

  # GET /to_dos
  # GET /to_dos.json
  def index
    @to_dos = ToDo.all.order(:id)
    respond_to do |format|
      format.html
      format.json { render json: @to_dos }
    end
  end

  # GET /to_dos/1
  # GET /to_dos/1.json
  def show
    respond_to do |format|
      format.html
      format.json { render json: @to_do }
    end
  end

  # GET /to_dos/new
  def new
    @to_do = ToDo.new
  end

  # GET /to_dos/1/edit
  def edit; end

  # POST /to_dos
  # POST /to_dos.json
  def create
    @to_do = ToDo.new(todo_params)

    respond_to do |format|
      if @to_do.save
        format.html { redirect_to @to_do, notice: 'ToDo was successfully created.' }
        format.json { render json: @to_do, status: :created, location: @to_do }
      else
        format.html { render :new }
        format.json { render json: @to_do.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /to_dos/1
  # PATCH/PUT /to_dos/1.json
  def update
    respond_to do |format|
      if @to_do.update(todo_params)
        format.html { redirect_to @to_do, notice: 'ToDo was successfully updated.' }
        format.json { render json: @to_do, status: :ok, location: @to_do }
      else
        format.html { render :edit }
        format.json { render json: @to_do.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /to_dos/1
  # DELETE /to_dos/1.json
  def destroy
    @to_do.destroy
    respond_to do |format|
      format.html { redirect_to to_dos_url, notice: 'ToDo was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def find_todo
    @to_do = ToDo.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def todo_params
    params.require(:to_do).permit(:desc, :completed)
  end
end
