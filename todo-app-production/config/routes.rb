Rails.application.routes.draw do
  root "lists#index"
  get "/lists(/*others)", to: "lists#index"

  resources :to_dos
end
