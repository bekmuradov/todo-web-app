function makeSequelizeDbService ({ model }) {
  const createOne = async (data) => {
    const result = await model.create(data)
    return result
  }

  const findOne = async (query, options = {}) => {
    const result = await model.findOne({
      where: query,
      ...options
    })
    return result
  }

  return Object.freeze({
    createOne,
    findOne
  })
}

module.exports = makeSequelizeDbService
