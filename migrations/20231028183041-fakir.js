"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("fakir", {
      id_fakir: {
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

      pekerjaan: Sequelize.BIGINT(20),
      pendapatan: Sequelize.BIGINT(20),
      umur: Sequelize.BIGINT(3),
      beban_tanggungan: Sequelize.BIGINT(20),
      surat_domisili: Sequelize.STRING,
      bobot_domisili: Sequelize.BIGINT(20),
      surat_golongan: Sequelize.STRING,
      bobot_golongan: Sequelize.BIGINT(20),
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
    await queryInterface.dropTable("fakir");
  },
};
