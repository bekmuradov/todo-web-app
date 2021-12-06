function makeSequelizeDbService ({ model }) {
  const createOne = async (data) => {
    const result = await model.create(data)
    return result
  }

  const findOne = async (query) => {
    const result = await model.findOne({
      where: query
    })
    return result
  }

  const findByPk = async (query) => {
    const result = await model.findByPk(query)
    return result
  }

  const findAllRecords = async (query, options = {}) => {
    options = {
      where: { ...query },
      ...options
    }
    const result = await model.findAll(options)
    return result
  }

  const deleteByPk = async (id) => {
    const result = await model.destroy({
      where: {
        id: id
      }
    })
    return result
  }

  // const updateByPk = async (data) => {
  //   const options = {
  //     where: {
  //       id: data.id
  //     }
  //   }
  //   const result = await model.update(data, options)
  //   return result
  // }

  const updateByPk = async (data) => {
    const pk = data.id
    let result = await model.update(data, {
      returning: true,
      where: { [model.primaryKeyField]: pk }
    })
    if (result) {
      result = await model.findOne({ where: { [model.primaryKeyField]: pk } })
    }
    return result
  }

  return Object.freeze({
    createOne,
    findOne,
    findByPk,
    findAllRecords,
    deleteByPk,
    updateByPk
  })
}

module.exports = makeSequelizeDbService