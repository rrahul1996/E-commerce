module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 30],
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 30],
        },
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [1, 30],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
        },
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [10, 10],
        },
      },
      address: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 100],
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 100],
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      total_orders: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      user_wallet_balance: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      // user_purchased_amount: {
      //   type: DataTypes.FLOAT,
      //   defaultValue: 0,
      // },
    },
    { timestamps: true }
  );

  User.associate = function (models) {
    User.hasOne(models.shippingaddress, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    User.hasOne(models.checkout, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    User.hasOne(models.walletbalance, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    User.hasMany(models.UserReq, {
      foreignKey: "request_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "request_user",
    });
    User.hasMany(models.UserReq, {
      foreignKey: "receiver_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "receiver_user",
    });
  };

  // User.sync({ alter: true })
  //   .then(() => {
  //     console.log("User table created successfully");
  //   })
  //   .catch((err) => {
  //     console.log("Error creating table: ", err.message);
  //   });

  return User;
};
