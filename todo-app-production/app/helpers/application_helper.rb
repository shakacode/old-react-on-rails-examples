#:nodoc:
module ApplicationHelper
  def dry_run?
    ENV["DRY_RUN"] == "true"
  end
end
