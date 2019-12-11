Rails.application.routes.draw do
  get 'home/welcome'
  root 'home#welcome'
end
