module.exports = (sequelize, DataTypes) => {
  const Gharimin = sequelize.define(
    "Gharimin",
    {
      id_gharimin: {
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
      jumlah_hutang: DataTypes.BIGINT(20),
      kuitansi: DataTypes.STRING,
      bobot_kuitansi: DataTypes.BIGINT(20),
      surat_permohonan: DataTypes.STRING,
      bobot_permohonan: DataTypes.BIGINT(20),
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
      tableName: "gharimin",
    }
  );

  return Gharimin;
};
