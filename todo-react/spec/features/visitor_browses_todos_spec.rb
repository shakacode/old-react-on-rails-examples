require "rails_helper"

RSpec.describe "Visitor browses todos", :js do
  scenario "visitor sees an input" do
    visit root_path

    expect(page).to have_css("input")
  end
end
