module.exports = (sequelize, DataTypes) => {
  const IbnuSabil = sequelize.define(
    "IbnuSabil",
    {
      id_ibnu_sabil: {
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
      surat_identitas: DataTypes.STRING,
      bobot_identitas: DataTypes.BIGINT(20),

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
      tableName: "ibnu_sabil",
    }
  );

  return IbnuSabil;
};
