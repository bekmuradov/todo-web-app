function buildMakeUserToken (tokenValidator) {
  return function makeUserToken ({ userId, token, tokenExpiredTime, isTokenExpired = false }) {
    const { error } = tokenValidator({ userId, token, tokenExpiredTime, isTokenExpired })
    if (error) {
      const ValidationError = new Error()
      ValidationError.name = 'ValidationError'
      ValidationError.message = `Invalid data in Token entity. ${error}`
      throw ValidationError
    }

    return Object.freeze({
      getToken: () => token,
      getUserId: () => userId,
      getTokenExpiresIn: tokenExpiredTime,
      getIsTokenExpired: () => isTokenExpired
    })
  }
}
module.exports = buildMakeUserToken
