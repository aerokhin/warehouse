module.exports = {
	up: async (queryInterface, Sequelize) => {
		const [ racks ] = await queryInterface.sequelize.query('SELECT id FROM racks');

		for (const rack of racks) {
			const sectionCount = Math.round(Math.random() * 5) + 5;
			const records = Array.from({ length: sectionCount }, (item, i) => ({
				capacity: Math.round(Math.random() * 10) + 10,
				rack_id: rack.id,
				section_no: i + 1,
				name: `Section ${i + 1}`,
				meta: JSON.stringify({}),
				enabled: true
			}));

			await queryInterface.bulkInsert('sections', records, {});
		}
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('sections', null, {});
	}
};
