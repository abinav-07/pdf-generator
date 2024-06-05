const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class PDFContents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here such as belongsto, has, hasMany and so on
    }
  }
  PDFContents.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pdf_name:{
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      custom_header: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      custom_header_image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      custom_body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      custom_footer: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "PDFContents",
      tableName: "pdf_contents",
    },
  )
  return PDFContents
}
