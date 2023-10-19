"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("ibnu_sabil", {
			id_ibnu_sabil: {
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
			surat_permohonan: Sequelize.STRING,
			bobot_surat: Sequelize.BIGINT(20),
			surat_identitas: Sequelize.STRING,
			bobot_identitas: Sequelize.BIGINT(20),

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
		await queryInterface.dropTable("ibnu_sabil");
	},
};
