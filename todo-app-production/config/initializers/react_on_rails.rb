# Shown below are the defaults for configuration
ReactOnRails.configure do |config|
  # Client bundles are configured in application.js

  # Directory where your generated assets go. All generated assets must go to the same directory.
  # Configure this in your webpack config files. This relative to your Rails root directory.
  config.generated_assets_dir = File.join(%w(app assets webpack))

  # Define the files we need to check for webpack compilation when running tests.
  config.webpack_generated_files = %w(
    global-styles-client-bundle.js
    global-styles-client-bundle.css
    todos-index-client-bundle.js
    todos-index-client-bundle.css
    vendor-client-bundle.js
    vendor-client-bundle.css
  )
  # TODO: add server-bundle.js

  # This is the file used for server rendering of React when using `(prerender: true)`
  # If you are never using server rendering, you may set this to "".
  # If you are using the same file for client and server rendering, having this set probably does
  # not affect performance.
  config.server_bundle_js_file = "" # TODO: turn on server-rendering

  # If you are using the ReactOnRails::TestHelper.configure_rspec_to_compile_assets(config)
  # with rspec then this controls what npm command is run
  # to automatically refresh your webpack assets on every test run.
  config.npm_build_test_command = "yarn run build:all:rspec"

  # This configures the script to run to build the production assets by webpack. Set this to nil
  # if you don"t want react_on_rails building this file for you.
  config.npm_build_production_command = "yarn run build:all:prod"

  ################################################################################
  # CLIENT RENDERING OPTIONS
  # Below options can be overriden by passing options to the react_on_rails
  # `render_component` view helper method.
  ################################################################################
  # default is false
  config.prerender = false

  # default is true for development, off otherwise
  config.trace = Rails.env.development?

  ################################################################################
  # SERVER RENDERING OPTIONS
  ################################################################################
  # If set to true, this forces Rails to reload the server bundle if it is modified
  config.development_mode = Rails.env.development?

  # For server rendering. This can be set to false so that server side messages are discarded.
  # Default is true. Be cautious about turning this off.
  config.replay_console = true

  # Default is true. Logs server rendering messages to Rails.logger.info
  config.logging_on_server = true

  # change to true to raise exception on server if the JS code throws
  config.raise_on_prerender_error = false

  # Server rendering only (not for render_component helper)
  # You can configure your pool of JS virtual machines and specify where it should load code:
  # On MRI, use `mini_racer` for the best performance
  # (see [discussion](https://github.com/reactjs/react-rails/pull/290))
  # On MRI, you"ll get a deadlock with `pool_size` > 1
  # If you"re using JRuby, you can increase `pool_size` to have real multi-threaded rendering.
  config.server_renderer_pool_size = 1 # increase if you"re on JRuby
  config.server_renderer_timeout = 20 # seconds

  ################################################################################
  # I18N OPTIONS
  ################################################################################
  # Replace the following line to the location where you keep translation.js & default.js.
  config.i18n_dir = Rails.root.join("client", "app", "libs", "i18n")

  ################################################################################
  # MISCELLANEOUS OPTIONS
  ################################################################################
  # enable if your content security policy doesn"t include `style-src: "unsafe-inline"`
  # Default is false
  config.skip_display_none = false

  # The server render method - either ExecJS or NodeJS
  config.server_render_method = "ExecJS"

  # Client js uses assets not digested by rails.
  # For any asset matching this regex, non-digested symlink will be created (as webpack wants)
  # To disable symlinks set this parameter to nil.
  config.symlink_non_digested_assets_regex = /\.(png|jpg|jpeg|gif|tiff|woff|ttf|eot|svg|map)/
end
