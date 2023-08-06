module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('logs', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT
			},
			method: {
				type: Sequelize.STRING
			},
			url: {
				type: Sequelize.STRING
			},
			queryParams: {
				type: Sequelize.STRING,
				field: 'query_params'
			},
			reqBody: {
				type: Sequelize.TEXT,
				field: 'req_body'
			},
			duration: {
				type: Sequelize.INTEGER
			},
			statusCode: {
				type: Sequelize.INTEGER,
				field: 'status_code'
			},
			resBody: {
				type: Sequelize.TEXT,
				field: 'res_body'
			},
			isError: {
				type: Sequelize.BOOLEAN,
				field: 'is_error',
				defaultValue: false
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

		return queryInterface.addIndex('logs', [ 'duration', 'status_code', 'is_error' ]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('logs');
	}
};
