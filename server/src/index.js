const app = require('./api')
const db = require('./api/model')
const seeder = require('./api/seeders')
const ErrorHandler = require('./api/utils/errorHandler')

// load app only if db is alive and kicking
// to drop existing tables and re-sync database use db.sequelize.sync({ force: true })
db.sequelize.sync({ alter: true }).then(async () => {
  const port = process.env.PORT || 8081
  app.use('/api/v1', require('./api/routes'))
  if (process.env.NODE_ENV === 'test') {
    seeder().then(() => {
      console.log('Seeding done.')
    })
  }
  app.use(ErrorHandler)
  app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`)
  })
  // when invalid routes are entered
  app.use(async (req, res) => {
    res.status(404).send('Route is no where to be found.')
  })
}, (err) => {
  console.log(`db is not ready, err:${err}`)
})
