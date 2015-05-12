var app = app || {};

app.ApplicationView = Backbone.View.extend({
	el: "#mainContainer",
	events: {
		'click #addBtn' : 'addEmployee'
	},
	initialize: function() {
		console.log("Application View initialized");
		//Make a fetch call to fetch Models
		this.collection = new app.EmployeeCollection();
		this.collection.fetch({
			reset: true,
			success: function(collection) {
				//console.log("Fetch Call Success: " + collection.toJSON());
			},
			failure: function(error) {
				console.log("Fetch Call Problem: " + JSON.stringify(error));
			}
		});
		//Listen to Collection Events
		this.listenTo(this.collection, 'reset', this.renderEmployeeList);
		this.listenTo(this.collection, 'add', this.renderEmployee);
	},
	generateRandomAvatar: function(min,max) {
		var randomNo = (Math.floor(Math.random() * (max - min + 1)) + min);
		return 'avatar-' + ((randomNo < 10) ? ('0' + randomNo) : randomNo);
	},
	addEmployee: function(e) {
		e.preventDefault();
		console.log('Adding an employee');
		//extract employee data from form
		var jsonData = {
			name: this.$el.find("#employeeName").val(),
			empId: this.$el.find("#employeeId").val(),
			doj: this.$el.find("#doj").val(),
			pic: this.generateRandomAvatar(1,16)
		};
		//create a model instance out of the data
		var newModel = new app.EmployeeModel(jsonData);
		//add model to collection
		this.collection.add(newModel); //here add event is thrown
	},
	renderEmployee: function(model) {
		var employeeView = new app.EmployeeView({model: model});
		this.$el.find('#employeeList').append(employeeView.render().el);
	},
	renderEmployeeList: function() {
		console.log('Collection reset event is triggered');
		var self = this;
		this.collection.forEach(function(model) {
			self.renderEmployee(model);
		});
	}
});