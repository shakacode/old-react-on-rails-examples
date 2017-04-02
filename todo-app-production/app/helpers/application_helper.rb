#:nodoc:
module ApplicationHelper
  def dry_run?
    ENV["DRY_RUN"] == "true"
  end

  def include_webpack_bundle_js(bundle_name)
    javascript_include_tag(bundle_name,
                           "data-turbolinks-track" => false,
                           "crossorigin" => "anonymous")
  end

  def include_webpack_bundle_css(bundle_name)
    stylesheet_link_tag(bundle_name, media: "all")
  end

  def include_webpack_bundle(bundle_name)
    include_webpack_bundle_js(bundle_name) + include_webpack_bundle_css(bundle_name)
  end
end
