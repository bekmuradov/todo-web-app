const model = require('../model')
const { user, todoList, todoListItem } = model
const userDbService = require('../services/dbService')({ model: user })
const todoListDbService = require('../services/dbService')({ model: todoList })
const todoListItemDbService = require('../services/dbService')({ model: todoListItem })

async function seedUser (dbService) {
  try {
    const userSeeds = require('./users')

    await Promise.all(userSeeds.map(async (user) => {
      await dbService.createOne(user)
    }))
    console.info('User model seeded🍺')
  } catch (error) {
    console.error('User seeder failed. ')
  }
}

async function seedTodoLists (dbService) {
  try {
    const seed = require('./todolists')
    await Promise.all(seed.map(async (todolist) => {
      await dbService.createOne(todolist)
    }))
    console.info('TodoList model seeded🍺')
  } catch (error) {
    console.error('TodoList seeder failed. ')
  }
}

async function seedTodoListItems (dbService) {
  try {
    const seed = require('./todolistitems')
    await Promise.all(seed.map(async (todolistitem) => {
      await dbService.createOne(todolistitem)
    }))
    console.info('TodoListItem model seeded🍺')
  } catch (error) {
    console.error('TodoListItem seeder failed. ')
  }
}

async function seedData () {
  await seedUser(userDbService)
  await seedTodoLists(todoListDbService)
  await seedTodoListItems(todoListItemDbService)
}

module.exports = seedData
