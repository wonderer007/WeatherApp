Rails.application.routes.draw do
  root 'home#welcome'
  get '/api/forecast', to: 'api#forecast'
end
