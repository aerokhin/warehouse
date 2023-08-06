const sizes = [
	'XS',
	'S',
	'M',
	'L',
	'XL',
	'XXL',
	'XXXL',
	'2T',
	'3T',
	'4T',
	'5T',
	'6',
	'7',
	'8',
	'10',
	'12',
	'14',
	'16',
	'18',
	'20'
];

module.exports = {
	up: (queryInterface, Sequelize) => {
		const records = Array.from({ length: 100 }, (item, i) => ({
			name: 'Product ' + `${i + 1}`.padStart(3, '0'),
			meta: JSON.stringify({
				sizes: [
					...sizes.slice(0, 6),
					...sizes.slice(7, Math.round((Math.random() * 13) + 7))
				]
			}),
			enabled: true
		}));

		return queryInterface.bulkInsert('products', records, {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('products', null, {});
	}
};
