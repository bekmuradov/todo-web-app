const { DataTypes } = require('sequelize')

function makeModel (sequelize) {
  const TodoList = sequelize.define('TodoList', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    addedBy: { type: DataTypes.INTEGER },
    updatedBy: { type: DataTypes.INTEGER }
  })

  return TodoList
}
module.exports = makeModel
