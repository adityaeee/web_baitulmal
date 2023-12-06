"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("madrasah", {
      id_madrasah: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },

      NIK: {
        type: Sequelize.BIGINT(16),
        references: {
          model: "masyarakat",
          key: "NIK",
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },

      surat_permohonan: Sequelize.STRING,
      bobot_surat: Sequelize.BIGINT(20),
      izin_operasional: Sequelize.STRING,
      bobot_izin: Sequelize.BIGINT(20),
      SK_pengurus: Sequelize.STRING,
      bobot_SK: Sequelize.BIGINT(20),
      data_madrasah: Sequelize.STRING,
      bobot_data: Sequelize.BIGINT(20),
      foto_PBM: Sequelize.STRING,
      bobot_PBM: Sequelize.BIGINT(20),
      norekening: Sequelize.BIGINT(10),
      rekening: Sequelize.STRING,
      bobot_rekening: Sequelize.BIGINT(20),

      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("madrasah");
  },
};
