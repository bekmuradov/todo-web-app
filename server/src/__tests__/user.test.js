/* eslint no-undef: "off" */
const { makeUser } = require('../api/entities/users/')

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
      password: 'Kjcndksoi01pa',
      email: 'David.Nalan@hotmail.com'
    }
    const user = makeUser(testUser)
    const newUser = {
      password: user.getPassword(),
      email: user.getEmail()
    }
    expect(newUser).toEqual(testUser)
  })
})

describe('[CASE 2] Test MakeUser', () => {
  test('throws error if invalid password', async () => {
    try {
      const testUser = {
        password: 'ymMQexqip', // password less than 8 characters
        email: 'David.Nalan@hotmail.com'
      }
      await makeUser(testUser)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in User entity. password must contain lower case, upper case and atleast one digit'
      expect(error).toStrictEqual(err)
    }
  })
})
