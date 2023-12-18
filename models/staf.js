module.exports = (sequelize, DataTypes) => {
  const Staf = sequelize.define(
    "Staf",
    {
      NIK: {
        type: DataTypes.BIGINT(16),
        primaryKey: true,
      },
      nama: DataTypes.STRING(50),
      email: DataTypes.STRING(50),
      username: DataTypes.STRING(20),
      password: DataTypes.STRING,
      alamat: DataTypes.TEXT,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      createdBy: {
        type: DataTypes.UUID,
        references: {
          model: "admin",
          key: "id",
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      updatedBy: {
        type: DataTypes.UUID,
        references: {
          model: "admin",
          key: "id",
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
    },
    {
      timesTamps: true,
      tableName: "staf",
    }
  );

  return Staf;
};
