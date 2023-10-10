"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("waqaf", {
			id_waqaf: {
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
			proposal: Sequelize.STRING,
			bobot_proposal: Sequelize.BIGINT(20),
			AIW: Sequelize.STRING,
			bobot_AIW: Sequelize.BIGINT(20),

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
		await queryInterface.dropTable("waqaf");
	},
};
