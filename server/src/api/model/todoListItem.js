const { DataTypes } = require('sequelize')

function makeModel (sequelize) {
  const TodoListItem = sequelize.define('TodoListItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: { type: DataTypes.STRING },
    isDone: {
      type: DataTypes.STRING,
      defaultValue: false
    },
    todoListId: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    addedBy: { type: DataTypes.INTEGER },
    updatedBy: { type: DataTypes.INTEGER }
  })
  TodoListItem.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())

    return values
  }
  return TodoListItem
}
module.exports = makeModel
