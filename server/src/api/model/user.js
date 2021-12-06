const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

function makeModel (sequelize) {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: { type: DataTypes.DATE }
  }, {
    hooks: {
      beforeCreate: [
        async function (user, options) {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10)
          }
        }
      ]
    }
  })
  User.prototype.isPasswordMatch = async function (password) {
    return await bcrypt.compare(password, this.password)
  }
  return User
}

module.exports = makeModel
