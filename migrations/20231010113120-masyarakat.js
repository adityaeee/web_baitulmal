"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("masyarakat", {
			no_KK: Sequelize.BIGINT(16),
			NIK: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},
			nama: Sequelize.STRING(50),
			tempat_lahir: Sequelize.STRING(15),
			tanggal_lahir: Sequelize.DATEONLY,
			periode: Sequelize.STRING,
			status: Sequelize.STRING,
			admin_GP: Sequelize.STRING,
			dusun: Sequelize.STRING,
			kode_gampong: {
				type: Sequelize.UUID,
				references: {
					model: "gampong",
					key: "kode_gampong",
				},
			},
			waktu_proses: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
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
		await queryInterface.dropTable("masyarakat");
	},
};
