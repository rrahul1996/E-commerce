module.exports = (sequelize, DataTypes) => {
  const ProductModel = sequelize.define(
    "product",
    {
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      product_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      product_image: {
        type: DataTypes.STRING,
      },
      product_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_status: {
        type: DataTypes.ENUM("available", "unavailable"),
        allowNull: false,
      },
      product_discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_discount_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_Instock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_outofstock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      product_review: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subcategories_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  ProductModel.associate = function (models) {
    ProductModel.belongsTo(models.category, {
      foreignKey: "category_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    ProductModel.belongsTo(models.subcategories, {
      foreignKey: "subcategories_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  // ProductModel.sync({ alter: true }).then(() => {
  //   console.log("Product table created successfully");
  // });

  return ProductModel;
};
