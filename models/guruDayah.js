module.exports = (sequelize, DataTypes) => {
  const GuruDayah = sequelize.define(
    "GuruDayah",
    {
      id_guru_dayah: {
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

      pendapatan: DataTypes.BIGINT(20),
      aset: DataTypes.BIGINT(20),
      beban_tanggungan: DataTypes.BIGINT(20),
      surat_domisili: DataTypes.STRING,
      bobot_domisili: DataTypes.BIGINT(20),
      surat_golongan: DataTypes.STRING,
      bobot_golongan: DataTypes.BIGINT(20),
      surat_keterangan: DataTypes.STRING,
      bobot_keterangan: DataTypes.BIGINT(20),
      jadwal_mengajar: DataTypes.STRING,
      bobot_jadwal: DataTypes.BIGINT(20),
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
      tableName: "guru_dayah",
    }
  );

  return GuruDayah;
};
