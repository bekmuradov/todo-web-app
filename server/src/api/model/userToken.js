const { DataTypes } = require('sequelize')

function makeModel (sequelize) {
  const UserToken = sequelize.define('user_token', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token_expired_time: { type: DataTypes.DATE },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  })

  UserToken.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())

    return values
  }

  return UserToken
}
module.exports = makeModel
