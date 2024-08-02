const { DataTypes } = require("sequelize");

module.exports = (database) => {
  database.define(
    "User",
    {
      id: {
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4 ,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('name', value.toUpperCase());
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      gender: {
        type: DataTypes.ENUM("MALE", "FEMALE"),
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      age: {
        type: DataTypes.STRING,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      timestamps: true,

      createdAt: false,

      updatedAt: "updateTimestamp",
    }
  );
};


