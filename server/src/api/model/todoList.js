const { DataTypes } = require('sequelize')

function makeModel (sequelize) {
  const TodoList = sequelize.define('todolist', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: { type: DataTypes.STRING },
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

  TodoList.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())

    return values
  }

  return TodoList
}
module.exports = makeModel
