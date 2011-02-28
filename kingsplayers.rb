require 'sinatra'
require 'sinatra/outputbuffer'
require 'haml'
require 'stringio'
require 'yaml'

PAGES_REGEX = "(tickets|directions|volunteer|about)"

helpers do
  def link_to(text, url, options = {})
    output = StringIO.new
    output << "<a href='#{url}'"
    options.each do |key, value|
      output << " #{key}='#{value}'"
    end
    output << ">#{text}</a>";
    output.string
  end
end

get '/test' do
  haml :test
end

get '/' do
  @shows = YAML.load File.new(File.expand_path("./shows.yaml")).readlines.join
  haml :shows
end

get %r{#{PAGES_REGEX}$} do |page|
  redirect "/#{page}/"
end

get %r{/#{PAGES_REGEX}/$} do |page|
  haml page.to_sym
end

not_found do
  haml :not_found
end
