const dbConnection = require('../config/dbConnection')
const db = {}
db.sequelize = dbConnection
db.user = require('./user')(dbConnection)
db.todoList = require('./todoList')(dbConnection)
db.todoListItem = require('./todoListItem')(dbConnection)
db.userToken = require('./userToken')(dbConnection)

/**
TODOLIST -> TODOLISTITEMS ASSOCIATION
*/
// todo list has many todo items
db.todoList.hasMany(db.todoListItem, {
  foreignKey: 'todolist_id',
  sourceKey: 'id'
})
// todo item belongs to todo list by todoListId
db.todoListItem.belongsTo(db.todoList, {
  foreignKey: 'todolist_id',
  as: '_todolistId',
  targetKey: 'id',
  onDelete: 'CASCADE'
})

/**
USER -> TODOLISTS ASSOCIATION
*/
// user has many todo lists by addedBy
db.user.hasMany(db.todoList, {
  foreignKey: 'added_by',
  sourceKey: 'id'
})
// user has many todo lists by updatedBy
db.user.hasMany(db.todoList, {
  foreignKey: 'updated_by',
  sourceKey: 'id'
})
// todo list belongs to user by addedBy
db.todoList.belongsTo(db.user, {
  foreignKey: 'added_by',
  as: '_addedBy',
  targetKey: 'id'
})
// todo list belongs to user by updatedBy
db.todoList.belongsTo(db.user, {
  foreignKey: 'updated_by',
  as: '_updatedBy',
  targetKey: 'id'
})

/**
USER -> TODOLISTITEMS ASSOCIATION
*/
// user has many todo items by addedBy
db.user.hasMany(db.todoListItem, {
  foreignKey: 'added_by',
  sourceKey: 'id'
})
// user has many todo items by updatedBy
db.user.hasMany(db.todoListItem, {
  foreignKey: 'updated_by',
  sourceKey: 'id'
})
// todo item belongs to user by addedBy
db.todoListItem.belongsTo(db.user, {
  foreignKey: 'added_by',
  as: '_addedBy',
  targetKey: 'id'
})
// todo item belongs to user by updatedBy
db.todoListItem.belongsTo(db.user, {
  foreignKey: 'updated_by',
  as: '_updatedBy',
  targetKey: 'id'
})

/**
USER -> TOKEN ASSOCIATION
*/
// user has one verification token by userId
db.user.hasOne(db.userToken, {
  foreignKey: 'user_id',
  as: '_userToken',
  sourceKey: 'id',
  foreignKeyConstraint: true
})
// token belongs to user by userId
db.userToken.belongsTo(db.user, {
  foreignKey: 'user_id',
  as: '_userId',
  targetKey: 'id',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
  foreignKeyConstraint: true
})

module.exports = db
