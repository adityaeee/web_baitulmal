module.exports = (sequelize, DataTypes) => {
  const Madrasah = sequelize.define(
    "Madrasah",
    {
      id_madrasah: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      NIK: {
        type: DataTypes.BIGINT(16),
        references: {
          model: "masyarakat",
          key: "NIK",
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },

      surat_permohonan: DataTypes.STRING,
      bobot_surat: DataTypes.BIGINT(20),
      izin_operasional: DataTypes.STRING,
      bobot_izin: DataTypes.BIGINT(20),
      SK_pengurus: DataTypes.STRING,
      bobot_SK: DataTypes.BIGINT(20),
      data_madrasah: DataTypes.STRING,
      bobot_data: DataTypes.BIGINT(20),
      foto_PBM: DataTypes.STRING,
      bobot_PBM: DataTypes.BIGINT(20),
      norekening: DataTypes.BIGINT(10),
      rekening: DataTypes.STRING,
      bobot_rekening: DataTypes.BIGINT(20),

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
      tableName: "madrasah",
    }
  );

  return Madrasah;
};
