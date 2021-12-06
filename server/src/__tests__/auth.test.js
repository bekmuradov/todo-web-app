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
      password: 'KjcndksoiO1pa',
      email: 'David.Nalan@hotmail.com'
    }

    const response = await request(app)
      .post('/auth/register')
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

describe('POST /login -> if email and password is correct', () => {
  test('should return user with authentication token', async () => {
    const testUser = {
      password: 'KjcndksoiO1pa',
      email: 'David.Nalan@hotmail.com'
    }
    const user = await request(app)
      .post('/auth/login')
      .send(testUser)
    expect(user.headers['content-type']).toEqual('application/json; charset=utf-8')
    expect(user.body.status).toBe('SUCCESS')
    expect(user.body.data.user.email).toEqual(testUser.email)
    expect(user.body.data).toMatchObject({
      user: {
        id: expect.any(Number),
        isVerified: expect.any(Boolean)
      },
      token: expect.any(String)
    })
    expect(user.statusCode).toBe(200)
  })
})

describe('POST /login -> if email is incorrect', () => {
  test('should return unauthorized status and user not exists', async () => {
    const user = await request(app)
      .post('/auth/login')
      .send(
        {
          password: 'KjcndksoiO1pa',
          email: 'hotmail.com'
        }
      )

    expect(user.headers['content-type']).toEqual('application/json; charset=utf-8')
    expect(user.body.status).toBe('BAD_REQUEST')
    expect(user.statusCode).toBeOneOf([401, 400])
  })
})

describe('POST /login -> if password is incorrect', () => {
  test('should return unauthorized status and incorrect password', async () => {
    const user = await request(app)
      .post('/auth/login')
      .send(
        {
          email: 'David.Nalan@hotmail.com',
          password: 'wrong@password'
        }
      )

    expect(user.headers['content-type']).toEqual('application/json; charset=utf-8')
    expect(user.body.status).toBe('BAD_REQUEST')
    expect(user.statusCode).toBeOneOf([401, 400])
  })
})

describe('POST /login -> if email or password is empty string or has not passed in body', () => {
  test('should return bad request status and insufficient parameters', async () => {
    const user = await request(app)
      .post('/auth/login')
      .send({})

    expect(user.headers['content-type']).toEqual('application/json; charset=utf-8')
    expect(user.body.status).toBe('BAD_REQUEST')
    expect(user.body.message).toBe('Insufficient parameters.')
    expect(user.statusCode).toBeOneOf([422, 400])
  })
})
