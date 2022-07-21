const express = require('express')

const app = express();
const port = 3000;

app.get('/goods', (req, res) => {
	res.send([
			{ date: 1658425002840, name: 'Wheat', count: 476, distance: 9512 },
			{ date: 1658425011393, name: 'Oat', count: 655, distance: 2703 },
			{ date: 1658425006253, name: 'Rice', count: 964, distance: 1070 },
			{ date: 1658425003833, name: 'Maize', count: 123, distance: 78 },
			{ date: 1658425011542, name: 'Corn', count: 498, distance: 2230 },
			{ date: 1658425011129, name: 'Packaged', count: 772, distance: 2320 },
			{ date: 1658425002763, name: 'Cereal', count: 470, distance: 9634 },
			{ date: 1658425009363, name: 'Beef', count: 145, distance: 6263 },
			{ date: 1658425010107, name: 'Yogurt', count: 426, distance: 1568 },
			{ date: 1658425007253, name: 'Berries', count: 634, distance: 1611 },
			{ date: 1658425009566, name: 'Beer', count: 140, distance: 404 },
			{ date: 1658425010448, name: 'Formula', count: 99, distance: 9992 },
			{ date: 1658425004734, name: 'Soybean', count: 832, distance: 6143 },
			{ date: 1658425011108, name: 'Beans', count: 557, distance: 9265 },
			{ date: 1658425011199, name: 'Potatoes', count: 695, distance: 451 },
			{ date: 1658425008896, name: 'Sorghum', count: 735, distance: 1220 },
			{ date: 1658425003559, name: 'Nuts', count: 882, distance: 346 },
			{ date: 1658425009286, name: 'Shellfish', count: 891, distance: 8223 },
			{ date: 1658425005205, name: 'Chocolate', count: 575, distance: 359 },
			{ date: 1658425002897, name: 'Apples', count: 183, distance: 6333 },
			{ date: 1658425003333, name: 'Cucumbers', count: 260, distance: 9377 },
			{ date: 1658425010409, name: 'Leaf', count: 679, distance: 883 },
			{ date: 1658425009021, name: 'Vegetables', count: 719, distance: 9545 },
		]
	);
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
