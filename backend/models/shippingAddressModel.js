module.exports = (sequelize, DataTypes) => {
  const ShippingAddress = sequelize.define(
    "shippingaddress",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      landmark: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pincode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: true }
  );

  ShippingAddress.associate = function (models) {
    ShippingAddress.belongsTo(models.user, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    ShippingAddress.hasMany(models.checkout, {
      foreignKey: "shippingaddress_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  // ShippingAddress.sync({ alter: true })
  //   .then(() => {
  //     console.log("ShippingAddress table created successfully");
  //   })
  //   .catch((err) => {
  //     console.log("Error creating table: ", err.message);
  //   });

  return ShippingAddress;
};
