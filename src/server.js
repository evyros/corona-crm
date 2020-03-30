const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


let customers = [];

app.get('/customer', (req, res) => {
	res.json(customers);
});

app.put('/customer', (req, res) => {
	customers.push({
		id: customers.length + 1,
		fullName: req.body.fullName,
		email: req.body.email,
		birthDate: req.body.birthDate,
		notes: req.body.notes
	});
	res.status(201).json(customers);
});

app.delete('/customer/:id', (req, res) => {
	const requestedCustomer = customers.find(customer => {
		return customer.id === parseInt(req.params.id);
	});

	if(!requestedCustomer) {
		res.sendStatus(404);
		return;
	}

	const index = customers.indexOf(requestedCustomer);
	customers.splice(index, 1);
	res.json(requestedCustomer);
});

app.post('/customer/:id', (req, res) => {
	const requestedCustomer = customers.find(customer => {
		return customer.id === parseInt(req.params.id);
	});

	if(!requestedCustomer) {
		res.sendStatus(404);
		return;
	}

	const index = customers.indexOf(requestedCustomer);
	customers[index] = {
		fullName: req.body.fullName,
		email: req.body.email,
		birthDate: req.body.birthDate,
		notes: req.body.notes
	};
	res.json(customers[index]);
});

app.listen(port, () => {
	console.log('App is listening on port ' + port);
});
