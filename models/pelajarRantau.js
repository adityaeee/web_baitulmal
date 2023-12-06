module.exports = (sequelize, DataTypes) => {
  const PelajarRantau = sequelize.define(
    "PelajarRantau",
    {
      id_pelajar_rantau: {
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
      ijazah: DataTypes.STRING,
      bobot_ijazah: DataTypes.BIGINT(20),
      paspor: DataTypes.STRING,
      bobot_paspor: DataTypes.BIGINT(20),
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
      tableName: "pelajar_rantau",
    }
  );

  return PelajarRantau;
};
