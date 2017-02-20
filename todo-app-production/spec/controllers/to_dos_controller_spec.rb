require "rails_helper"

RSpec.describe ToDosController, type: :controller do
  describe "format: :json" do
    describe "#index" do
      it "renders an array of ToDo JSON objects" do
        todo = create(:to_do)
        get :index, format: :json
        expect(response.body).to eql([todo].to_json)
      end
    end

    describe "#show" do
      it "renders a ToDo JSON object" do
        todo = create(:to_do)
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
      it "renders a ToDo JSON object upon success" do
        post :create, params: { to_do: { desc: "ToDo" } }, format: :json
        expect(response.body).to include('"desc":"ToDo","completed":false,')
      end

      it "renders a ToDo JSON object upon failure" do
        post :create, params: { to_do: { completed: "yes" } }, format: :json
        expect(response.body).to eql('{"desc":["is too short (minimum is 1 character)"]}')
      end
    end

    describe "#update" do
      it "renders a ToDo JSON object upon success" do
        todo = create(:to_do)
        put :update, params: { id: todo.id,
                               to_do: { desc: "ToDo", completed: true } }, format: :json
        expect(response.body).to include('desc":"ToDo","completed":true,')
      end

      it "renders a ToDo JSON object upon failure" do
        pending "testing execution upon save failure requires a test double"
        fail # rubocop:disable Style/SignalException
      end
    end

    describe "#destroy" do
      it "returns { head: no_content }" do
        todo = create(:to_do)
        delete :destroy, params: { id: todo.id }, format: :json
        expect(response.body).to eql("")
      end
    end
  end

  describe "format: :html" do
    describe "#index" do
      it "renders lists/index" do
        create(:to_do)
        get :index
        expect(response).to render_template(:index)
      end
    end

    describe "#show" do
      it "renders lists/show" do
        todo = create(:to_do)
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
        todo = create(:to_do)
        get :edit, params: { id: todo.id }
        expect(response).to render_template(:edit)
      end
    end

    describe "#create" do
      it "renders lists/create upon success" do
        post :create, params: { to_do: { desc: "ToDo" } }
        expect(flash[:notice]).to eql("ToDo was successfully created.")
        expect(response).to redirect_to assigns(:to_do)
      end

      it "renders lists/new upon failure" do
        post :create, params: { to_do: { completed: "yes" } }
        expect(response).to render_template(:new)
      end
    end

    describe "#update" do
      it "renders lists/update upon success" do
        todo = create(:to_do)
        put :update, params: { id: todo.id, to_do: { desc: "ToDo", completed: true } }
        expect(flash[:notice]).to eql("ToDo was successfully updated.")
        expect(response).to redirect_to to_do_url
      end

      it "renders lists/edit upon failure" do
        pending "testing execution upon save failure requires a test double"
        fail # rubocop:disable Style/SignalException
      end
    end

    describe "#destroy" do
      it "redirects to to_dos_url" do
        todo = create(:to_do)
        delete :destroy, params: { id: todo.id }
        expect(flash[:notice]).to eql("ToDo was successfully destroyed.")
        expect(response).to redirect_to to_dos_url
      end
    end
  end
end
