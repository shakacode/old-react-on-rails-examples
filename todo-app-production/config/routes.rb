Rails.application.routes.draw do
  root 'lists#index'

  resources :to_dos
end
