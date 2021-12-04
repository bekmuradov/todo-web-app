/* eslint no-undef: "off" */
const dotenv = require('dotenv')
dotenv.config()
process.env.NODE_ENV = 'test'
const request = require('supertest')
const db = require('../api/config/dbConnection')
const User = require('../api/model').user
const app = require('../api/index.js')
const routes = require('../api/routes')
app.use(routes)

beforeAll(async function () {
  await db.sync({})
})

afterAll(async function () {
  await db.dropAllSchemas()
  await db.drop()
  await db.close()
})

describe('GET / -> test the root path', () => {
  test('It should response the GET method', () => {
    return request(app)
      .get('/')
      .then(response => {
        expect(response.statusCode).toBe(200)
      })
  })
})

describe('POST /register -> if email is given', () => {
  test('should register a user', async () => {
    const testUser = {
      password: 'ymMQexqx0IdEiOT',
      email: 'Katarina.Powlowski35@hotmail.com'
    }

    const response = await request(app)
      .post('/register')
      .send(testUser)
    expect(response.headers['content-type']).toEqual('application/json; charset=utf-8')
    expect(response.statusCode).toBe(200)
    expect(response.body.status).toBe('SUCCESS')
    expect(response.body.data).toMatchObject({ id: expect.any(Number) })
    expect(response.body).toMatchObject({
      data: {
        email: testUser.email
      }
    })
    // Assert user was correctly stored in the database.
    const registeredUser = await User.findByPk(response.body.data.id)
    expect(registeredUser).not.toBeNull()
    expect(registeredUser.password).not.toBe(testUser.password)
  })
})
