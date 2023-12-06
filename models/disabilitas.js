module.exports = (sequelize, DataTypes) => {
  const Disabilitas = sequelize.define(
    "Disabilitas",
    {
      id_disabilitas: {
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
      aset: DataTypes.BIGINT(20),
      golongan_disabilitas: DataTypes.BIGINT(20),
      surat_domisili: DataTypes.STRING,
      bobot_domisili: DataTypes.BIGINT(20),
      surat_golongan: DataTypes.STRING,
      bobot_golongan: DataTypes.BIGINT(20),
      surat_keterangan: DataTypes.STRING,
      bobot_keterangan: DataTypes.BIGINT(20),
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
      tableName: "disabilitas",
    }
  );

  return Disabilitas;
};
