module.exports = (sequelize, DataTypes) => {
  const Waqaf = sequelize.define(
    "Waqaf",
    {
      id_waqaf: {
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
      proposal: DataTypes.STRING,
      bobot_proposal: DataTypes.BIGINT(20),
      AIW: DataTypes.STRING,
      bobot_AIW: DataTypes.BIGINT(20),

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
      tableName: "waqaf",
    }
  );

  return Waqaf;
};
