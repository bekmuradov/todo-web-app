const dbConnection = require('../config/dbConnection')
const db = {}
db.sequelize = dbConnection
db.user = require('./user')(dbConnection)
db.todoList = require('./todoList')(dbConnection)
db.todoListItem = require('./todoListItem')(dbConnection)
db.todoListItem.belongsTo(db.todoList, {
  foreignKey: 'todoListId',
  as: '_todoListId',
  targetKey: 'id',
  onDelete: 'CASCADE'
})
db.todoList.hasMany(db.todoListItem, {
  foreignKey: 'todoListId',
  sourceKey: 'id'
})
db.todoList.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id'
})
db.user.hasMany(db.todoList, {
  foreignKey: 'addedBy',
  sourceKey: 'id'
})
db.todoList.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id'
})
db.user.hasMany(db.todoList, {
  foreignKey: 'updatedBy',
  sourceKey: 'id'
})
db.todoListItem.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id'
})
db.user.hasMany(db.todoListItem, {
  foreignKey: 'addedBy',
  sourceKey: 'id'
})
db.todoListItem.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id'
})
db.user.hasMany(db.todoListItem, {
  foreignKey: 'updatedBy',
  sourceKey: 'id'
})

module.exports = db
