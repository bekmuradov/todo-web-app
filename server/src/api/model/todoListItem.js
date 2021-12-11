const { DataTypes } = require('sequelize')

function makeModel (sequelize) {
  const TodoListItem = sequelize.define('todolist_item', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: { type: DataTypes.STRING },
    is_done: {
      type: DataTypes.STRING,
      defaultValue: false
    },
    todolist_id: { type: DataTypes.INTEGER },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    added_by: { type: DataTypes.INTEGER },
    updated_by: { type: DataTypes.INTEGER }
  })
  TodoListItem.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())

    return values
  }
  return TodoListItem
}
module.exports = makeModel
