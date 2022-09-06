module.exports = (sequelize, DataTypes) => {
  const SubCategories = sequelize.define(
    "subcategories",
    {
      subcategories_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subcategories_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subcategories_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subcategories_image: {
        type: DataTypes.STRING,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  SubCategories.associate = function (models) {
    SubCategories.hasMany(models.product, {
      foreignKey: "subcategories_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    SubCategories.belongsTo(models.category, {
      foreignKey: "category_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  // SubCategories.sync({ alter: true })
  //   .then(() => {
  //     console.log("SubCategories table created successfully");
  //   })
  //   .catch((err) => {
  //     console.log("Error creating table: ", err.message);
  //   });

  return SubCategories;
};
