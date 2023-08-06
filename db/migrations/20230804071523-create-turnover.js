module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('turnovers', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			sectionId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				field: 'section_id'
			},
			productId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				field: 'product_id'
			},
			action: {
				type: Sequelize.STRING(8),
				allowNull: false,
			},
			quantity: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 1
			},
			size: {
				type: Sequelize.STRING(8),
				allowNull: false
			},
			meta: {
				type: Sequelize.JSON,
				allowNull: false,
				defaultValue: {}
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

		return queryInterface.addIndex('turnovers', [ 'section_id', 'product_id', 'action', 'quantity', 'size' ]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('turnovers');
	}
};
