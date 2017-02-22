#:nodoc:
class Todo < ApplicationRecord
  validates :description, length: { minimum: 1 }
  validates :completed, inclusion: { in: [true, false] }
end
