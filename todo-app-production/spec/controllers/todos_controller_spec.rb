require "rails_helper"

RSpec.describe TodosController, type: :controller do
  describe "#index" do
    it "renders an array of Todo JSON objects" do
      todo = create(:todo)
      get :index, format: :json
      expect(response.body).to eql([todo].to_json)
    end
  end

  describe "#show" do
    it "renders a Todo JSON object" do
      todo = create(:todo)
      get :show, params: { id: todo.id }, format: :json
      expect(response.body).to eql(todo.to_json)
    end
  end

  describe "#create" do
    it "renders a Todo JSON object upon success" do
      post :create, params: { todo: { description: "Todo" } }, format: :json
      expect(response.body).to include('"description":"Todo","completed":false,')
    end

    it "renders a Todo JSON object upon failure" do
      post :create, params: { todo: { completed: "yes" } }, format: :json
      expect(response.body).to eql('{"description":["is too short (minimum is 1 character)"]}')
    end
  end

  describe "#update" do
    it "renders a Todo JSON object upon success" do
      todo = create(:todo)
      put :update, params: { id: todo.id,
                             todo: { description: "Todo", completed: true } }, format: :json
      expect(response.body).to include('description":"Todo","completed":true,')
    end

    it "renders a Todo JSON object upon failure" do
      pending "testing execution upon save failure requires a test double"
      fail # rubocop:disable Style/SignalException
    end
  end

  describe "#destroy" do
    it "returns { head: no_content }" do
      todo = create(:todo)
      delete :destroy, params: { id: todo.id }, format: :json
      expect(response.body).to eql("")
    end
  end
end
