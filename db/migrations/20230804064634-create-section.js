module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('sections', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			rackId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				field: 'rack_id'
			},
			sectionNo: {
				type: Sequelize.INTEGER,
				allowNull: false,
				field: 'section_no'
			},
			capacity: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING
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

		return queryInterface.addIndex('sections', [ 'rack_id', 'section_no', 'enabled' ]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('sections');
	}
};
