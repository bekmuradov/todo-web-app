/* eslint no-undef: "off" */
const userSchemaKeys = require('../api/validator/userSchema')
const userValidator = require('../api/validator/index')(userSchemaKeys)
const makeUser = require('../api/entities/user')({ userValidator })

require('dotenv').config()
process.env.NODE_ENV = 'test'
const db = require('../api/config/dbConnection')

beforeAll(async function () {
  await db.sync({})
})

afterAll(async function () {
  await db.dropAllSchemas()
  await db.drop()
  await db.close()
})

describe('[CASE 1] Test MakeUser', () => {
  test('should create a new user if valid payload', () => {
    const testUser = {
      password: 'kjcndksoiOOpa',
      email: 'David.Nalan@hotmail.com'
    }
    const user = makeUser(testUser)
    expect(user).toEqual(testUser)
  })
})

describe('[CASE 2] Test MakeUser', () => {
  test('throws error if invalid password', async () => {
    try {
      const testUser = {
        password: 'ymMQexq', // password less than 8 characters
        email: 'David.Nalan@hotmail.com'
      }
      await makeUser(testUser)
    } catch (error) {
      const err = {
        name: 'ValidationError',
        message: 'Invalid data in User entity. password must be min 8 characters'
      }
      expect(error).toStrictEqual(err)
    }
  })
})
