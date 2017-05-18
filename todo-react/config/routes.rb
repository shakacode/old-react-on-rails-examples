Rails.application.routes.draw do
  root "lists#index"
  get "/lists(/*others)", to: "lists#index"

  scope "/api/v1" do
    resources :todos, except: [:new, :edit], defaults: { format: "json" }
  end
end
