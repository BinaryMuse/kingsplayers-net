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

def load_shows
  YAML.load File.read(File.expand_path("./shows.yaml"))
end

get '/' do
  @shows = load_shows
  haml :shows
end

get %r{^/shows/([0-9])$} do |num|
  @show_num = num.to_i
  @shows = load_shows
  if @show_num > @shows.size || @show_num <= 0
    return 404
  end
  @show = @shows[@show_num - 1]
  haml :show
end

get %r{^#{PAGES_REGEX}$} do |page|
  redirect "/#{page}/"
end

get %r{^/#{PAGES_REGEX}/$} do |page|
  haml page.to_sym
end

not_found do
  haml :not_found
end
