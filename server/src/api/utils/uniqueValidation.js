function makeUniqueValidation (userService) {
  const isUserUnique = async (data) => {
    const { Op } = require('sequelize')
    const filter = { [Op.or]: [] }
    if (data && data.email && data.password) {
      filter[Op.or].push(
        { password: data.password },
        { email: data.email }
      )
    }
    const found = await userService.findOne(filter)
    if (found) {
      return false
    }
    return true
  }
  return Object.freeze({ isUserUnique })
}

module.exports = makeUniqueValidation
