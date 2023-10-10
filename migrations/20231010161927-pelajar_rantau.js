"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("pelajar_rantau", {
			id_pelajar_rantau: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},

			NIK: {
				type: Sequelize.UUID,
				references: {
					model: "masyarakat",
					key: "NIK",
				},
				onDelete: "RESTRICT",
				onUpdate: "CASCADE",
			},

			pekerjaan: Sequelize.BIGINT(20),
			pendapatan: Sequelize.BIGINT(20),
			masa_belajar: Sequelize.BIGINT(20),
			ijazah: Sequelize.STRING,
			bobot_ijazah: Sequelize.BIGINT(20),
			paspor: Sequelize.STRING,
			bobot_paspor: Sequelize.BIGINT(20),
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
			createdBy: {
				type: Sequelize.UUID,
				references: {
					model: "admin",
					key: "id",
				},
				onDelete: "RESTRICT",
				onUpdate: "CASCADE",
			},
			updatedBy: {
				type: Sequelize.UUID,
				references: {
					model: "admin",
					key: "id",
				},
				onDelete: "RESTRICT",
				onUpdate: "CASCADE",
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("pelajar_rantau");
	},
};
