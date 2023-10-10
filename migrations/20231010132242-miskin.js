"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("miskin", {
			id_miskin: {
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
			aset: Sequelize.BIGINT(20),
			beban_tanggungan: Sequelize.BIGINT(20),
			surat_domisili: Sequelize.STRING,
			bobot_domisili: Sequelize.BIGINT(20),
			surat_golongan: Sequelize.STRING,
			bobot_golongan: Sequelize.BIGINT(20),
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
		await queryInterface.dropTable("miskin");
	},
};
