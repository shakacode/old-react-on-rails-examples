class ToDo < ApplicationRecord
  validates :desc, length: { minimum: 1 }
  validates :completed, inclusion: { in: [ true, false ] }
end
