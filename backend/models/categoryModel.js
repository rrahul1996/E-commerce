module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "category",
    {
      category_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_image: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: true }
  );

  Category.associate = function (models) {
    Category.hasMany(models.subcategories, {
      foreignKey: "category_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Category.hasMany(models.product, {
      foreignKey: "category_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  // Category.sync({ alter: true })
  //   .then(() => {
  //     console.log("Category table created successfully");
  //   })
  //   .catch((err) => {
  //     console.log("Error creating table: ", err.message);
  //   });

  return Category;
};
