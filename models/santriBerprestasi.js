module.exports = (sequelize, DataTypes) => {
  const SantriBerprestasi = sequelize.define(
    "SantriBerprestasi",
    {
      id_santri_pres: {
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

      pekerjaan: DataTypes.BIGINT(20),
      pendapatan: DataTypes.BIGINT(20),
      masa_belajar: DataTypes.BIGINT(20),
      surat_domisili: DataTypes.STRING,
      bobot_domisili: DataTypes.BIGINT(20),
      surat_keterangan: DataTypes.STRING,
      bobot_keterangan: DataTypes.BIGINT(20),
      surat_keterangan2: DataTypes.STRING,
      bobot_keterangan2: DataTypes.BIGINT(20),
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
      tableName: "santri_berprestasi",
    }
  );

  return SantriBerprestasi;
};
