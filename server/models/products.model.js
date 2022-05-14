module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "name",
        validate: {
          notEmpty: true,
          min: {
            args: [3],
          },
        },
      },
      price: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        field: "price",
        validate: {
          isDecimal: true
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "updated_at",
      },
    },
    {
      tableName: "products",
    }
  );
};
