# frozen_string_literal: true

ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rspec/rails'
abort('The Rails environment is running in production mode!') if Rails.env.production?
require 'spec_helper'
require 'capybara/rspec'
require 'capybara-screenshot/rspec'
require 'database_cleaner'

# Checks for pending migrations before tests are run.
# If you are not using ActiveRecord, you can remove this line.
ActiveRecord::Migration.maintain_test_schema!

# Requires supporting files with custom matchers and macros, etc,
# in ./support/ and its subdirectories.
Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods

  # Next line will ensure that assets are built if webpack -w is not running
  ReactOnRails::TestHelper.configure_rspec_to_compile_assets(config)

  driver = :selenium_chrome

  DriverRegistration.register_selenium_chrome

  Capybara.javascript_driver = driver
  Capybara.default_driver = driver

  Capybara.register_server(Capybara.javascript_driver) do |app, port|
    require 'rack/handler/puma'
    Rack::Handler::Puma.run(app, Port: port)
  end

  # Capybara.default_max_wait_time = 15
  puts "Capybara using driver: #{Capybara.javascript_driver}"

  Capybara.save_path = Rails.root.join('tmp', 'capybara')
  Capybara::Screenshot.prune_strategy = { keep: 10 }

  def js_errors_driver
    Capybara.javascript_driver
  end

  def js_selenium_driver
    driver = :selenium_chrome
    DriverRegistration.register_selenium_chrome
    driver
  end

  config.use_transactional_fixtures = false

  config.before(:suite) do
    if config.use_transactional_fixtures?
      raise(<<-MSG)
          Delete line `config.use_transactional_fixtures = true` from rails_helper.rb
          (or set it to false) to prevent uncommitted transactions being used in
          JavaScript-dependent specs.

          During testing, the app-under-test that the browser driver connects to
          uses a different database connection to the database connection used by
          the spec. The app's database connection would not be able to access
          uncommitted transaction data setup over the spec's database connection.
      MSG
    end
    DatabaseCleaner.clean_with(:truncation)
  end

  config.before(:each) do
    DatabaseCleaner.strategy = :transaction
  end

  config.before(:each, type: :feature) do
    # :rack_test driver's Rack app under test shares database connection
    # with the specs, so continue to use transaction strategy for speed.
    driver_shares_db_connection_with_specs = Capybara.current_driver == :rack_test

    unless driver_shares_db_connection_with_specs
      # Driver is probably for an external browser with an app
      # under test that does *not* share a database connection with the
      # specs, so use truncation strategy.
      DatabaseCleaner.strategy = :truncation
    end
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.append_after(:each) do
    DatabaseCleaner.clean
    Capybara.reset_sessions!
  end

  config.use_transactional_fixtures = false
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
end
