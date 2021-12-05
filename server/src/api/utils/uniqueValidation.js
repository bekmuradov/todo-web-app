function makeUniqueValidation (userService) {
  const isUserUnique = async (data) => {
    const found = await userService.findOne(data)
    if (found) {
      return false
    }
    return true
  }
  return Object.freeze({ isUserUnique })
}

module.exports = makeUniqueValidation
