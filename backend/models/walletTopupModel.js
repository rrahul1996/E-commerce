module.exports = (sequelize, DataTypes) => {
  const walletTopup = sequelize.define(
    "walletbalance",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      topup_date: {
        type: DataTypes.DATE,
      },
      topup_type: {
        type: DataTypes.ENUM("credit", "debit"),
        defaultValue: "credit",
      },
      topup_status: {
        type: DataTypes.ENUM("pending", "success", "failed"),
        defaultValue: "success",
      }
    },
    { timestamps: true }
  );

  walletTopup.associate = function (models) {
    walletTopup.belongsTo(models.user, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  // walletTopup
  //   .sync({ alter: true })
  //   .then(() => {
  //     console.log("walletTopup table created successfully");
  //   })
  //   .catch((err) => {
  //     console.log("Error creating table: ", err.message);
  //   });

  return walletTopup;
};
