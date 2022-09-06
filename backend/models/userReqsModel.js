module.exports = (sequelize, DataTypes) => {
  const UserReq = sequelize.define(
    "UserReq",
    {
      request_id: {
        type: DataTypes.INTEGER,
      },
      receiver_id: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM("pending", "accepted", "rejected"),
        allowNull: false,
      },
      is_connected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      is_friend: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  UserReq.associate = function (models) {
    UserReq.belongsTo(models.user, {
      foreignKey: "request_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "request_user",
    });

    UserReq.belongsTo(models.user, {
      foreignKey: "receiver_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "receiver_user",
    });
  };

  // UserReq.sync({ alter: true })
  //   .then(() => {
  //     console.log("UserReq table created successfully");
  //   })
  //   .catch((err) => {
  //     console.log("Error creating table: ", err.message);
  //   });

  return UserReq;
};
