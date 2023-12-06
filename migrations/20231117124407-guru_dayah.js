"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("guru_dayah", {
      id_guru_dayah: {
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

      pendapatan: Sequelize.BIGINT(20),
      aset: Sequelize.BIGINT(20),
      beban_tanggungan: Sequelize.BIGINT(20),
      surat_domisili: Sequelize.STRING,
      bobot_domisili: Sequelize.BIGINT(20),
      surat_golongan: Sequelize.STRING,
      bobot_golongan: Sequelize.BIGINT(20),
      surat_keterangan: Sequelize.STRING,
      bobot_keterangan: Sequelize.BIGINT(20),
      jadwal_mengajar: Sequelize.STRING,
      bobot_jadwal: Sequelize.BIGINT(20),
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
    await queryInterface.dropTable("guru_dayah");
  },
};
