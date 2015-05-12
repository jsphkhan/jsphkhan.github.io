var app = app || {};

app.EmployeeModel = Backbone.Model.extend({
	defaults: {
		name: '',
		empid: '',
		pic: '',
		doj: ''
	}
});