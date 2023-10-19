"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("gharimin", {
			id_gharimin: {
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
			aset: Sequelize.BIGINT(20),
			jumlah_hutang: Sequelize.BIGINT(20),
			tempo_waktu: Sequelize.BIGINT(20),
			kuitansi: Sequelize.STRING,
			bobot_kuitansi: Sequelize.BIGINT(20),
			surat_permohonan: Sequelize.STRING,
			bobot_permohonan: Sequelize.BIGINT(20),
			surat_keterangan: Sequelize.STRING,
			bobot_keterangan: Sequelize.BIGINT(20),
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
		await queryInterface.dropTable("gharimin");
	},
};
