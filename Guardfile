require 'guard/plugin'

module ::Guard
  class Mocha < ::Guard::Plugin
    def start
      run_all
    end

    def run_all
      system 'make test-unit other_options="--reporter mocha-unfunk-reporter"'
    end

    def run_on_changes(paths)
      run_all
    end
  end
end


guard :mocha do
  watch(/.js/)
end

