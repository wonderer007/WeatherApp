Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  root 'home#welcome'
  get '/api/forecast', to: 'api#forecast'
end
