const app = require('./api')
const db = require('./api/model')
const seeder = require('./api/seeders')
// load app only if db is alive and kicking
db.sequelize.sync({ alter: true }).then(() => {
  const port = process.env.PORT || 8081
  app.use('/api/v1', require('./api/routes'))
  seeder().then(() => {
    console.log('Seeding done.')
  })
  app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`)
  })
}, (err) => {
  console.log(`db is not ready, err:${err}`)
})
