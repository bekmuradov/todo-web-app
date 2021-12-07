/* eslint no-undef: "off" */
const { makeUser } = require('../api/entities/users/')

require('dotenv').config()
process.env.NODE_ENV = 'test'
// const db = require('../api/config/dbConnection')
//
// beforeAll(async function () {
//   await db.sync({})
// })
//
// afterAll(async function () {
//   await db.dropAllSchemas()
//   await db.drop()
//   await db.close()
// })

describe('[CASE 1] Test MakeUser', () => {
  test('should create a new user if valid payload', () => {
    const testUser = {
      password: 'Kjcndksoi01pa',
      email: 'aroon@yahoo.com'
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
        email: 'Charong@dev.asia'
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

describe('[CASE 3] Test MakeUser', () => {
  test('throws error if invalid tlds', async () => {
    try {
      const testUser = {
        password: 'Kjcndksoi01pa',
        email: 'tommy.shelby@peackyblinders.gb' // invalid tld
      }
      await makeUser(testUser)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in User entity. accepted email tlds .com, .net, .th, .ac, .edu, .asia'
      expect(error).toStrictEqual(err)
    }
  })
})

describe('[CASE 4] Test MakeUser', () => {
  test('sets isVerified field to false by default', () => {
    const testUser = {
      password: 'Kjcndksoi01pa',
      email: 'alphie.solomons@peackyblinders.com'
    }
    const user = makeUser(testUser)
    const expected = false
    const actual = user.getVerified()
    expect(expected).toEqual(actual)
  })
})
