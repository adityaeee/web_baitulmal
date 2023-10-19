module.exports = (sequelize, DataTypes) => {
	const Admin = sequelize.define(
		"Admin",
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			NIK: DataTypes.BIGINT(16),
			nama: DataTypes.STRING(50),
			email: DataTypes.STRING(50),
			username: DataTypes.STRING(20),
			password: DataTypes.STRING,
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
			tableName: "admin",
		}
	);

	return Admin;
};
