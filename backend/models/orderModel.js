module.exports = (sequelize, DataTypes) => {
  const CheckOut = sequelize.define(
    "checkout",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      shippingaddress_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      order_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      payment_method: {
        type: DataTypes.ENUM("CASH", "CREDIT_CARD"),
        allowNull: false,
        defaultValue: "CASH",
      },
      payment_status: {
        type: DataTypes.ENUM("PENDING", "COMPLETED"),
        allowNull: false,
        defaultValue: "PENDING",
      },
      order_status: {
        type: DataTypes.ENUM("PENDING", "COMPLETED"),
        allowNull: false,
        defaultValue: "PENDING",
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      delivery_fee: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      final_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expected_delivery_date: {
        type: DataTypes.DATE,
      },
      products : {
        type : DataTypes.JSON,
        allowNull: true,
      }
    },
    { timestamps: true }
  );

  CheckOut.associate = function (models) {
    CheckOut.belongsTo(models.user, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    CheckOut.belongsTo(models.shippingaddress, {
      foreignKey: "shippingaddress_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  // CheckOut.sync({ alter: true })
  //   .then(() => {
  //     console.log("CheckOut table created successfully");
  //   })
  //   .catch((err) => {
  //     console.log("Error creating table: ", err.message);
  //   });

  return CheckOut;
};
