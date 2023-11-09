module.exports = (sequelize, DataTypes) => {
  const Gampong = sequelize.define(
    "Gampong",
    {
      kode_gampong: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      nama_gampong: DataTypes.STRING,
      kecamatan: DataTypes.STRING,
      dusun: DataTypes.STRING,
      NIK: DataTypes.BIGINT(16),
      nama: DataTypes.STRING(50),
      email: DataTypes.STRING(50),
      username: DataTypes.STRING(20),
      password: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timesTamps: true,
      tableName: "gampong",
    }
  );

  return Gampong;
};
