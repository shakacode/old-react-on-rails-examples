Rails.application.routes.draw do
  root "lists#index"
  get "/lists(/*others)", to: "lists#index"

  resources :todos, except: { :new, :edit }, defaults: { format: "json" }
end
