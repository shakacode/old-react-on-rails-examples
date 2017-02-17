Rails.application.routes.draw do
  root 'lists#index'

  resources :todos
end
