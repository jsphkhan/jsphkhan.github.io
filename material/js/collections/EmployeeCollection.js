var app = app || {};

app.EmployeeCollection = Backbone.Collection.extend({
	url: '../data/employees.json',
	model: app.EmployeeModel,
	parse: function(response) {
		return response.employees;
	}
});