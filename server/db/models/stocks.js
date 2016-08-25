export default (sequelize, DataTypes) =>
  sequelize.define('stock', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    ticker: {
      type: DataTypes.STRING,
      notNull: true
    },
    name: {
      type: DataTypes.STRING,
      notNull: true
    }
  }, {
    timestamps: false
  });