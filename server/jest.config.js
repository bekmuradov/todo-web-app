// module.exports = {
//   reporters: ['default', ['jest-junit', { suiteName: 'jest tests' }]],
//   setupFilesAfterEnv: ["jest-extended/all"]
// }

// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  setupFilesAfterEnv: ['jest-extended/all']
}

module.exports = config

// Or async function
module.exports = async () => {
  return {
    verbose: true,
    setupFilesAfterEnv: ['jest-extended/all']
  }
}
