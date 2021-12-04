const app = require('./api')
const db = require('./api/model')
// load app only if db is alive and kicking
db.sequelize.sync({ alter: true }).then(() => {
  const port = process.env.PORT || 8081
  app.use('/api/v1', require('./api/routes'))
  app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`)
  })
}, (err) => {
  console.log(`db is not ready, err:${err}`)
})
