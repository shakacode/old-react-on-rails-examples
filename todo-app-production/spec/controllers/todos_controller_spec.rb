require "rails_helper"

RSpec.describe TodosController, type: :controller do
  describe "format: :json" do
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

    # If javascript works, then the new form is a react component
    # describe "#new" do
    # end

    # If javascript works, then the edit form is a react component
    # describe "#edit" do
    # end

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

  describe "format: :html" do
    describe "#index" do
      it "renders lists/index" do
        create(:todo)
        get :index
        expect(response).to render_template(:index)
      end
    end

    describe "#show" do
      it "renders lists/show" do
        todo = create(:todo)
        get :show, params: { id: todo.id }
        expect(response).to render_template(:show)
      end
    end

    describe "#new" do
      it "renders lists/new template" do
        get :new
        expect(response).to render_template(:new)
      end
    end

    describe "#edit" do
      it "renders lists/edit template" do
        todo = create(:todo)
        get :edit, params: { id: todo.id }
        expect(response).to render_template(:edit)
      end
    end

    describe "#create" do
      it "renders lists/create upon success" do
        post :create, params: { todo: { description: "Todo" } }
        expect(flash[:notice]).to eql("Todo was successfully created.")
        expect(response).to redirect_to assigns(:todo)
      end

      it "renders lists/new upon failure" do
        post :create, params: { todo: { completed: "yes" } }
        expect(response).to render_template(:new)
      end
    end

    describe "#update" do
      it "renders lists/update upon success" do
        todo = create(:todo)
        put :update, params: { id: todo.id, todo: { description: "Todo", completed: true } }
        expect(flash[:notice]).to eql("Todo was successfully updated.")
        expect(response).to redirect_to todo_url
      end

      it "renders lists/edit upon failure" do
        pending "testing execution upon save failure requires a test double"
        fail # rubocop:disable Style/SignalException
      end
    end

    describe "#destroy" do
      it "redirects to todos_url" do
        todo = create(:todo)
        delete :destroy, params: { id: todo.id }
        expect(flash[:notice]).to eql("Todo was successfully destroyed.")
        expect(response).to redirect_to todos_url
      end
    end
  end
end
