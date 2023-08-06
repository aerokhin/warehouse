module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('products', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
				validate: {
					min: 10001,
					max: 49999,
				},
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			meta: {
				type: Sequelize.JSON,
				allowNull: false,
				defaultValue: {}
			},
			enabled: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				field: 'created_at',
				defaultValue: Sequelize.literal('NOW()')
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				field: 'updated_at',
				defaultValue: Sequelize.literal('NOW()')
			}
		});
		await queryInterface.sequelize.query('ALTER TABLE products AUTO_INCREMENT = 10001;');

		return queryInterface.addIndex('products', [ 'enabled' ]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('products');
	}
};
