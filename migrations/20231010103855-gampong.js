"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("gampong", {
			kode_gampong: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},
			nama_gampong: Sequelize.STRING,
			kecamatan: Sequelize.STRING,
			dusun: Sequelize.STRING,
			NIK: Sequelize.BIGINT(16),
			nama: Sequelize.STRING(50),
			email: Sequelize.STRING(50),
			username: Sequelize.STRING(20),
			password: Sequelize.STRING,
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
		queryInterface.dropTable("gampong");
	},
};
