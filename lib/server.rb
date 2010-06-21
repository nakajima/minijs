require 'rubygems'
require 'sinatra'

enable :static
set :public, File.dirname(__FILE__) + '/../js'

get '/' do
  erb File.read("test/index.html")
end

get '/test' do
  erb File.read("test/test.html")
end

get '/get' do
  "GOT IT!"
end

post '/' do
  "Fill in text"
end

post '/:name' do
  "YOU POSTED #{params[:name]}"
end
