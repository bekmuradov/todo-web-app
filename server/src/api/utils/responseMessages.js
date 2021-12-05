const responseCode = require('./responseCodes')

module.exports = {

  successResponse: (data = {}) => ({
    headers: data.headers || { 'Content-Type': 'application/json' },
    statusCode: data.statusCode || responseCode.success,
    data: {
      status: 'SUCCESS',
      message: data.message || 'Your request is successfully executed',
      data: data.data || {}
    }
  }),

  inValidParam: (data = {}) => ({
    headers: data.headers || { 'Content-Type': 'application/json' },
    statusCode: data.statusCode || responseCode.validationError,
    data: {
      status: 'VALIDATION_ERROR',
      message: data.message || 'Invalid Data, Validation Failed.',
      data: data.data || {}
    }
  }),

  failureResponse: (data = {}) => ({
    headers: data.headers || { 'Content-Type': 'application/json' },
    statusCode: data.statusCode || responseCode.internalServerError,
    data: {
      status: 'FAILURE',
      message: data.message || 'Internal server error.',
      data: data.data || {}
    }
  })
}
