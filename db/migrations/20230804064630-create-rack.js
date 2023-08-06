module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('racks', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			storeId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				field: 'store_id'
			},
			alias: {
				type: Sequelize.STRING,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
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

		return queryInterface.addIndex('racks', [ 'store_id', 'alias', 'enabled' ]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('racks');
	}
};
