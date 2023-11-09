module.exports = (sequelize, DataTypes) => {
	const Masyarakat = sequelize.define(
		"Masyarakat",
		{
			no_KK: DataTypes.BIGINT(16),
			NIK: {
				type: DataTypes.BIGINT(16),
				primaryKey: true,
			},
			nama: DataTypes.STRING(50),
			tempat_lahir: DataTypes.STRING(15),
			tanggal_lahir: DataTypes.DATEONLY,
			golongan: DataTypes.STRING(50),
			periode: DataTypes.STRING,
			status: DataTypes.STRING,
			admin_GP: DataTypes.STRING,
			dusun: DataTypes.STRING,
			kode_gampong: {
				type: DataTypes.UUID,
				references: {
					model: "gampong",
					key: "kode_gampong",
				},
			},
			waktu_proses: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			createdAt: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			updatedAt: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
		},
		{
			timesTamps: true,
			tableName: "masyarakat",
		}
	);

	return Masyarakat;
};
