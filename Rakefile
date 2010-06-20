require 'lib/js_min'

desc "Build the thing"
task :build do
  js = %w[base ajax].map { |f| File.read('js/' + f + '.js') }
  File.open('minijs.js', 'w+') { |f| f.puts(JsMin.minify(js)) }
end
