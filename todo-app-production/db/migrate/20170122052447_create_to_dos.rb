class CreateToDos < ActiveRecord::Migration[5.0]
  def change
    create_table :to_dos do |t|
      t.string      "desc",         null: false
      t.boolean     "completed",  default: false, null: false

      t.timestamps
    end
  end
end
