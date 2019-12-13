class ApiController < ApplicationController
  def forecast
    url = "https://api.darksky.net/forecast/867454159489bcd1f039739ada329176/#{params[:latitude]},#{params[:longitude]}?units=si"
    response = Net::HTTP.get(URI.parse(url))

    render json: response
  rescue Exception => error
    render json: error
  end
end
